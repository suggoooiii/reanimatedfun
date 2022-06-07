/* eslint-disable no-console */
import React, { useRef, useState } from "react";
import { Path } from "react-native-svg";
import Animated, { Easing, useAnimatedProps } from "react-native-reanimated";

interface AnimatedStrokeProps {
  d: string;
  progress: Animated.SharedValue<number>;
}

const AnimPath = Animated.createAnimatedComponent(Path);
const colors = ["#FFC27A", "#7EDAB9", "#45A6E5", "#FE8777"];

function AnimatedStroke({ d, progress }: AnimatedStrokeProps) {
  const [length, setLength] = useState(0);
  const stroke = colors[Math.round(Math.random() * colors.length - 1)];

  const pathRef = useRef<Path>(null);

  const bgStrokeAnimation = useAnimatedProps(() => ({
    strokeDashoffset:
      length - length * Easing.bezierFn(0.61, 1, 0.88, 1)(progress.value),
    // fillOpacity: progress.value,
  }));
  const strokeAnimation = useAnimatedProps(() => ({
    strokeDashoffset:
      length - length * Easing.bezierFn(0.37, 0, 0.63, 1)(progress.value),
  }));

  return (
    <>
      <AnimPath
        animatedProps={bgStrokeAnimation}
        d={d}
        stroke={stroke}
        strokeWidth={7}
        strokeDasharray={length}
      />
      <AnimPath
        animatedProps={strokeAnimation}
        onLayout={() => setLength(pathRef.current!.getTotalLength())}
        ref={pathRef}
        d={d}
        stroke="black"
        strokeWidth={7}
        strokeDasharray={length}
      />
    </>
  );
}
export default AnimatedStroke;
