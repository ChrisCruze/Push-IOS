import React, { useState } from "react";
import { StyleSheet, View, Dimensions, Platform, TouchableWithoutFeedback } from "react-native";

import { Feather as Icon } from "@expo/vector-icons";

import Text from "./Text";
import Theme from "./Theme";

const GoalComponent = ({ text, navigateToGoal, pushGoal, totalCount }) => {
  const contentStyle = [styles.content];
  const nameStyle = [styles.name];

  const color = "black";
  return (
    <View style={styles.container}>
      <View style={contentStyle}>
        <View style={styles.header}>
          <View style={styles.metadata}>
            <Text style={nameStyle}>{text}</Text>
          </View>
        </View>
        <View style={buttonStyles.container}>
          <View style={buttonStyles.content}>
            <TouchableWithoutFeedback onPress={pushGoal}>
              <View style={buttonStyles.comments}>
                <Icon name="circle" size={18} {...{ color }} />
                <Text style={[buttonStyles.commentCount, { color }]}>{totalCount}</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={navigateToGoal}>
              <View style={buttonStyles.commentsRight}>
                <Icon name="arrow-up-right" size={18} {...{ color }} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </View>
  );
};
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.14,
    shadowRadius: 6,
    borderColor: Theme.palette.borderColor,
    borderWidth: Platform.OS === "ios" ? 0 : 1,
    marginVertical: 2, //Theme.spacing.small,
    backgroundColor: "white",
  },
  content: {
    padding: Theme.spacing.small,
  },
  header: {
    flexDirection: "row",
    marginBottom: Theme.spacing.small,
  },
  metadata: {
    marginLeft: 0, //Theme.spacing.small,
  },
  name: {
    color: "black",
  },
  text: {
    flexWrap: "wrap",
  },
  picture: {
    height: width,
    borderRadius: 5,
  },
});

const buttonStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  comments: {
    marginLeft: Theme.spacing.tiny,
    flexDirection: "row",
  },
  commentsRight: {
    marginLeft: Theme.spacing.tiny,
  },
  commentCount: {
    marginLeft: Theme.spacing.tiny,
  },
});
export default GoalComponent;
