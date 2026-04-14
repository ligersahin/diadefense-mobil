import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, ImageBackground } from "react-native";
import { router } from "expo-router";

export default function Index() {
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const titleTimer = setTimeout(() => {
      Animated.timing(titleOpacity, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }).start();
    }, 800);

    const subtitleTimer = setTimeout(() => {
      Animated.timing(subtitleOpacity, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }).start();
    }, 1200);

    const navTimer = setTimeout(() => {
      router.replace("/(tabs)");
    }, 2800);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(subtitleTimer);
      clearTimeout(navTimer);
      titleOpacity.stopAnimation();
      subtitleOpacity.stopAnimation();
    };
  }, [subtitleOpacity, titleOpacity]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/brand/splash/splash.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.centerBlock}>
          <Animated.Text style={[styles.title, { opacity: titleOpacity }]}>DiaDefense</Animated.Text>
          <Animated.Text style={[styles.subtitle, { opacity: subtitleOpacity }]}>
            Metabolik savunmanı güçlendir
          </Animated.Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  centerBlock: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ translateY: 200 }],
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "600",
  },
  subtitle: {
    marginTop: 8,
    color: "#ccc",
    fontSize: 14,
    fontWeight: "400",
  },
});
