import React from "react";
import { StyleSheet, Text, Dimensions, TouchableWithoutFeedback } from "react-native";
import { Neomorph } from "react-native-neomorph-shadows";
import Theme from "./Theme";

const ButtonNeomorph = ({ onPress, text }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Neomorph darkShadowColor="#000000" lightShadowColor="#D1CDC7" style={styles.neomorph}>
        <Text style={styles.text}>{text}</Text>
      </Neomorph>
    </TouchableWithoutFeedback>
  );
};
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  neomorph: {
    shadowOpacity: 0.4,
    shadowRadius: 5,
    borderRadius: 30,
    borderColor: "#000000",
    borderWidth: 2,
    backgroundColor: Theme.palette.background,
    width: width * 0.3,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  text: {
    fontWeight: "bold",
    fontSize: 25,
  },
});
export default ButtonNeomorph;
