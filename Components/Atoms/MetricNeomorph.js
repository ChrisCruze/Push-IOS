import React, { useState, Fragment } from "react";
import { StyleSheet, Text, View, Button, Dimensions, TouchableWithoutFeedback } from "react-native";
import { Neomorph } from "react-native-neomorph-shadows";
import Theme from "./Theme";

const MetricNeomorph = ({ text, number }) => {
  return (
    <Neomorph darkShadowColor="#D1CDC7" lightShadowColor="#FFF" style={styles.neomorph}>
      <View style={styles.wrapper}>
        <Text style={styles.number}>{number}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
    </Neomorph>
  );
};
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  neomorph: {
    borderColor: "#000000",
    backgroundColor: Theme.palette.background, //"#ECF0F3",
    width: width * 0.33,
    height: 50,
    alignItems: "center",
    alignContent: "center",

    justifyContent: "center",
    paddingHorizontal: 20,
    flexBasis: "33%",
    flex: 1,
    maxWidth: "33%",
    display: "flex",
    flexDirection: "row",
    flexDirection: "row",
  },
  wrapper: {
    alignContent: "center",
  },
  number: {
    fontWeight: "bold",
    flex: 1,
    fontSize: 24,
    textAlign: "center",
    width: "100%",
  },
  text: {
    flex: 1,
    fontSize: 12,
    textAlign: "center",
  },
});

export default MetricNeomorph;
