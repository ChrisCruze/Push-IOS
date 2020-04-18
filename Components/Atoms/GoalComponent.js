import React, { useState } from "react";
import { StyleSheet, View, Dimensions, Platform, TouchableWithoutFeedback } from "react-native";

import { Feather as Icon, Ionicons, FontAwesome } from "@expo/vector-icons";

import Text from "./Text";
import Theme from "./Theme";

const GoalComponent = ({ text, navigateToGoal, pushGoal, totalCount, deleteGoal }) => {
  const contentStyle = [styles.content];
  const nameStyle = [styles.name];

  const color = "black";
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={pushGoal}>
        <View style={contentStyle}>
          <View style={styles.header}>
            <View style={styles.metadata}>
              <View style={{ flexDirection: "column", alignItems: "center" }}>
                <Text style={nameStyle}>{text}</Text>

                <Text style={styles.countStyle}>{totalCount}</Text>
              </View>
            </View>
          </View>
          <View style={buttonStyles.container}>
            <View style={buttonStyles.content}>
              <TouchableWithoutFeedback onPress={navigateToGoal}>
                <View style={buttonStyles.commentsRight}>
                  <FontAwesome name="dashboard" size={18} {...{ color }} />
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={deleteGoal}>
                <View style={buttonStyles.commentsRight}>
                  <Icon name="trash" size={18} {...{ color }} />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    height: 150,
    width: width * 0.9,
    shadowColor: "#BFBFBF",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    justifyContent: "center",
    marginLeft: width * 0.05,
    shadowRadius: 50,
    borderColor: "black",
    borderWidth: Platform.OS === "ios" ? 0 : 1,
    marginVertical: 2, //Theme.spacing.small,
    backgroundColor: "white",
  },
  countStyle: {
    fontSize: 30,
    padding: 15,
  },
  content: {
    // padding: Theme.spacing.small,
  },
  header: {
    justifyContent: "center",

    flexDirection: "row",
    marginBottom: Theme.spacing.small,
    alignItems: "center",
  },
  metadata: {
    flexDirection: "row",

    // justifyContent: "space-between",
    alignItems: "center",

    // width: width,

    // marginLeft: 0, //Theme.spacing.small,
  },
  name: {
    // alignItems: "flex-end",
    alignItems: "center",

    color: "black",
    fontSize: 30,
    padding: 15,
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
    color: "white",
    fontSize: 30,
    padding: 10,
  },
});
export default GoalComponent;
