import * as React from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";

import Text from "./Text";
import Theme from "./Theme";
const FirstPost = ({ share }) => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={share}>
        <Icon name="plus-circle" color={Theme.palette.primary} size={25} />
      </TouchableWithoutFeedback>
      <Text style={styles.text}>Looks like you have not shared anything yet. Now is the time to make your first post!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {},
  primary: {
    shadowColor: "rgba(0, 170, 255, 0.29)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 7
  }
});

export default FirstPost;
