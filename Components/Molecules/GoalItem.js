import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import APIStore from "../Atoms/APIStore";
import GoalComponent from "../Atoms/GoalComponent";

const GoalOptionsPress = ({ id, navigation, goals }) => {
  const pass_dict = { id: id, goals: goals };
  console.log({ pass_dict });
  navigation.navigate("Goal", pass_dict);
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

const GoalItem = ({ id, title, goals, cadenceCount, navigation, pushGoal, deleteGoal }) => {
  const totalCount = GoalCountGet({ goals, id });
  const navigateToGoal = () => {
    GoalOptionsPress({ id, navigation, goals });
  };
  const pushGoalPress = () => {
    GoalPushsPress({ id, pushGoal });
  };
  const deleteGoalPress = () => {
    deleteGoal(id);
  };

  return (
    <GoalComponent
      navigateToGoal={navigateToGoal}
      pushGoal={pushGoalPress}
      deleteGoal={deleteGoalPress}
      text={title}
      totalCount={totalCount}
    />
  );
};

export default GoalItem;
