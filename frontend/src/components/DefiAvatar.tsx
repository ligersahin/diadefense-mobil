import React, { useEffect, useRef } from "react";
import { Image, View, StyleSheet, ImageStyle, ViewStyle, Animated, Easing } from "react-native";

type Props = {
  size?: number;
  style?: ViewStyle;
  imageStyle?: ImageStyle;
};

export default function DefiAvatar({ size = 140, style, imageStyle }: Props) {
  const scale = useRef(new Animated.Value(1)).current;
  const finalSize = size * 1.1;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.05,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();

    return () => {
      animation.stop();
    };
  }, [scale]);

  return (
    <View style={[styles.container, { width: finalSize, height: finalSize }, style]}>
      <Animated.View
        style={{
          width: finalSize,
          height: finalSize,
          transform: [{ scale }],
        }}
      >
        <Image
          source={require("../../assets/defi/defi.png")}
          style={[styles.image, { width: finalSize, height: finalSize }, imageStyle]}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 0,
    marginTop: 0,
  },
  image: {
    // nothing here; size comes from props
  },
});

