import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import APIStore from "../Atoms/APIStore";
import GoalComponent from "../Atoms/GoalComponent";

const GoalOptionsPress = ({ id, navigation }) => {
  navigation.navigate("Goal", { id: id });
  console.log(`navigate to options page ${id}`);
};

const GoalPushsPress = ({ id, pushGoal }) => {
  // APIStore.push(id);
  console.log("record activity now!");
  pushGoal(id);
};

const GoalCountGet = ({ goals, id }) => {
  const goals_filtered =
    goals.find(function(D) {
      return D["id"] == id;
    })["timeStamps"] || [];
  const totalCount = goals_filtered.length;
  return totalCount;
};

const GoalItem = ({ id, title, goals, cadenceCount, navigation, pushGoal }) => {
  const totalCount = GoalCountGet({ goals, id });
  const navigateToGoal = () => {
    GoalOptionsPress({ id, navigation });
  };
  const pushGoalPress = () => {
    GoalPushsPress({ id, pushGoal });
  };
  return (
    <GoalComponent
      navigateToGoal={navigateToGoal}
      pushGoal={pushGoalPress}
      text={title}
      totalCount={totalCount}
    />
  );
};

export default GoalItem;
