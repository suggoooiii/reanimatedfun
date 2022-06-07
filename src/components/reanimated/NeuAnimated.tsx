import { useRef, useState } from "react";
import { Dimensions, View } from "react-native";
import Animated, {
  ColorSpace,
  Easing,
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle, Path } from "react-native-svg";

interface NeuAnimated {
  progress: Animated.SharedValue<number>;
  // strokeWidth: Animated.SharedValue<number>;
}
const Margin = 5;
const vWidth = 575 - Margin;
const vHeight = 575 - Margin;
const width = Dimensions.get("window").width;
const height = (width * vHeight) / vWidth;

const Gutpath = [
  "M274 561C318.556 561 361.288 532.185 392.794 480.894C424.3 429.603 442 360.037 442 287.5C442 214.963 424.3 145.398 392.794 94.1063C361.288 42.8151 318.556 14 274 14L274 287.5V561Z",
];
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function NeuAnimated({ progress: progressRaw }: NeuAnimated) {
  const ref = useRef<Path>(null);
  const [length, setLength] = useState(0);

  const expColor = "rgba(144,54,70,1)";

  const part1 = useDerivedValue(() =>
    Easing.inOut(Easing.ease)(
      interpolate(progressRaw.value, [0.1, 1], [0.4, 1], Extrapolate.CLAMP),
    ),
  );
  const fillColor = useDerivedValue(() =>
    interpolateColor(
      progressRaw.value,
      [0, 1],
      ["transparent", expColor],
      "RGB",
    ),
  );

  // for rotating the circle
  const part2 = useDerivedValue(() =>
    Easing.in(Easing.ease)(
      interpolate(progressRaw.value, [0, 1], [1, 0], Extrapolate.CLAMP),
    ),
  );
  const circle = useAnimatedProps(() => ({
    r: part1.value * 275,
  }));

  const strokeAnimation = () => {
    "worklet";

    return {
      strokeDashoffset: length - length * part1.value,
      fill: fillColor.value,
    };
  };

  const rotateAnimation = (target: number) => () => {
    "worklet";

    return {
      transform: [{ rotate: `${target * part2.value}rad` }],
    };
  };

  const animatedrops1 = useAnimatedProps(strokeAnimation);
  // const animatedrops2 = useAnimatedProps(strokeAnimation);
  // const animatedrops3 = useAnimatedProps(strokeAnimation);
  const rotate = useAnimatedStyle(rotateAnimation(Math.PI)); // Math.PI
  return (
    <View>
      <Animated.View style={[rotate]}>
        <Svg
          width={width}
          height={height}
          viewBox={[0, 0, vWidth, vHeight].join(" ")}
        >
          <>
            {Gutpath.map((d, key) => (
              <AnimatedPath
                animatedProps={animatedrops1}
                onLayout={() => setLength(ref.current!.getTotalLength())}
                ref={ref}
                d={d}
                key={key}
                strokeDasharray={length}
                stroke="black"
                strokeWidth={5}
              />
            ))}
          </>
          <AnimatedCircle
            animatedProps={circle}
            cx="287.5"
            cy="287.5"
            stroke="rgba(144,54,70,1)"
            strokeWidth="13"
          />
        </Svg>
      </Animated.View>
    </View>
  );
}
