import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function Index() {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Image
        source={require("../assets/brand/splash/splash.png")}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      />
      <Redirect href="/(tabs)" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
