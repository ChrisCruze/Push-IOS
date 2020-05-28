import * as React from "react";
import { StyleSheet, SafeAreaView, View, Image, Dimensions } from "react-native";

import Images from "../Atoms/Images";

const Logo = () => {
  return (
    <View style={styles.container}>
      <Image style={[styles.cover]} source={Images.cover} />
    </View>
  );
};
const { width } = Dimensions.get("window");

const n = 75;
const d = n * Math.sqrt(2);
const translation = (d - n) * 0.5 + n * 0.5;
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: d * 2,
    height: d * 2,
  },
  cover: {
    // ...StyleSheet.absoluteFillObject,
    // width,
    // height: width,
  },
});

export default Logo;
