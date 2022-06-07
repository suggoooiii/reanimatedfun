/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { Image, MotiView, MotiText, useAnimationState } from "moti";

interface Car {
  color: string;
  name: string;
  image: string;
  price: string;
}

const cars: Car[] = [
  {
    color: "#AFB9C8",
    name: "Vanue ",
    price: "692,690",
    image:
      "https://www.hyundai.com/content/dam/hyundai/in/en/data/find-a-car/1600x590_venue.png",
  },
  {
    color: "#907FA4",
    name: "SANTRO",
    price: "473,690",
    image:
      "https://www.hyundai.com/content/dam/hyundai/in/en/data/vehicle-thumbnail/1600x590_santro.png",
  },
  {
    color: "#94D0CC",
    name: "Grand I10 Nios",
    price: "523,690",
    image:
      "https://www.hyundai.com/content/dam/hyundai/in/en/data/vehicle-thumbnail/1600x590_nios.png",
  },
  {
    color: "#FDFAF6",
    name: "Grand i20 ",
    price: "685,690",
    image:
      "https://www.hyundai.com/content/dam/hyundai/in/en/data/vehicle-thumbnail/1600x590_i20.png",
  },
];

// function Shape() {
//   const styles = StyleSheet.create({
//     shape: {
//       justifyContent: "center",
//       height: 250,
//       width: 250,
//       borderRadius: 25,
//       marginRight: 10,
//       backgroundColor: "rgba(255,255,255,0.2)",
//     },
//   });
//   return (
//     <MotiView
//       from={{
//         opacity: 0,
//         scale: 0.5,
//       }}
//       animate={{
//         opacity: 1,
//         scale: 1,
//       }}
//       transition={{
//         type: "timing",
//       }}
//       style={styles.shape}
//     />
//   );
// }

export default function AniMoti() {
  // const [visible, toggle] = React.useReducer(s => !s, true);
  const [pressed, setPressed] = useState(false);
  const { height, width } = useWindowDimensions();
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#255",
      }}
    >
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        data={[...cars]}
        renderItem={({ item, index }) => (
          <View
            style={{
              flex: 1,
              width,
              height,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Cards item={item} key={index} />
          </View>
        )}
      />
    </View>
  );
}
function Cards({ item }: { item: Car }) {
  const { height, width } = useWindowDimensions();
  const [open, setOpen] = useState(false);
  const state = useAnimationState({
    from: {
      opacity: 1,
      translateY: -80,
      translateX: 0,
      scale: 1.6,
      rotate: "0deg",
    },
    to: {
      opacity: 1,
      translateX: 0,
      backgroundColor: item.color,
      scale: 1.2,
      translateY: 0,
      rotate: "0deg",
    },
  });
  const Mainstate = useAnimationState({
    from: {
      scale: 1.2,
      translateY: 50,
      backgroundColor: item.color,
      height: height * 0.65,
      width: width * 0.8,
    },
    to: {
      scale: 1,
      translateY: 70,
      backgroundColor: "#fff",
      height: width * 0.5,
      width: width * 0.5,
    },
  });
  return (
    <Pressable
      onPress={() => {
        if (state.current === "from") {
          state.transitionTo("to");
          Mainstate.transitionTo("to");
          setOpen(false);
        } else {
          Mainstate.transitionTo("from");
          state.transitionTo("from");
          setOpen(true);
        }
      }}
    >
      <MotiView
        state={state}
        transition={{
          type: "timing",
          duration: 500,
        }}
        style={{
          height: width * 0.5,
          overflow: "hidden",
          zIndex: 50,
          position: "absolute",
          width: width * 0.5,
          borderRadius: 16,
        }}
      >
        <Image
          resizeMode="contain"
          style={[StyleSheet.absoluteFillObject]}
          source={{ uri: item.image }}
        />
      </MotiView>
      <MotiView
        state={Mainstate}
        style={{
          backgroundColor: "#C490E4",
          borderRadius: 16,
          position: "relative",
        }}
      >
        {!open ? (
          <View
            style={[
              {
                position: "absolute",
                bottom: 10,
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 16,
              },
            ]}
          >
            <MotiText
              style={{
                fontWeight: "700",
                color: "#77777",
                textAlign: "center",
                fontSize: 18,
              }}
            >
              {item.name}
            </MotiText>
          </View>
        ) : (
          <CarDetail item={item} />
        )}
      </MotiView>
    </Pressable>
  );
}
function CarDetail({ item }: { item: Car }) {
  const { height, width } = useWindowDimensions();
  return (
    <MotiView
      transition={{
        type: "timing",
        duration: 300,
      }}
      from={{
        translateY: -300,
        opacity: 0,
      }}
      animate={{
        translateY: 0,
        opacity: 1,
      }}
      exit={{
        translateY: -300,
        opacity: 0,
      }}
      style={{
        justifyContent: "flex-end",
        height: height * 0.65,
        paddingHorizontal: 30,
        paddingVertical: 20,
      }}
    >
      <MotiText
        style={{
          fontSize: 24,
          fontWeight: "600",
          color: "#343A40",
        }}
      >
        {item.name}
      </MotiText>
      <View
        style={{
          marginVertical: 20,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {/* <FontAwesome color="#343A40" name="rupee" size={20} /> */}
        <MotiText
          style={{
            fontSize: 16,
            fontWeight: "300",
            color: "#343A40",
            marginHorizontal: 5,
          }}
        >
          {item.price}
        </MotiText>
      </View>
      <View
        style={{
          height: 60,
          paddingHorizontal: 30,
          backgroundColor: "black",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Text style={{ color: "#fff" }}>Book A Ride</Text>
        {/* <FontAwesome color="white" name="long-arrow-right" /> */}
      </View>
    </MotiView>
  );
}
