import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import APIStore from "../Atoms/APIStore";
import GoalComponent from "../Atoms/GoalComponent";
import moment from "moment";

const GoalOptionsPress = ({ id, navigation, goals }) => {
  const pass_dict = { id: id, goals: goals };
  console.log({ pass_dict });
  navigation.navigate("Goal", pass_dict);
  console.log(`navigate to options page ${id}`);
};

const GoalCountGet = ({ goals, id }) => {
  const goals_filtered =
    goals.find(function(D) {
      return D["id"] == id;
    })["timeStamps"] || [];
  const totalCount = goals_filtered.length;
  return totalCount;
};

const GoalItem = ({
  id,
  _id,
  cadence,
  timeStamps,
  title,
  goals,
  cadenceCount,
  navigation,
  updateGoal,
  removeGoal,
  refetch,
}) => {
  const totalCount = GoalCountGet({ goals, id });
  const navigateToGoal = () => {
    GoalOptionsPress({ id, navigation, goals });
  };

  const pushGoalPress = () => {
    const timeStampsWithNew = timeStamps.concat(moment().format());
    updateGoal({
      variables: {
        _id,
        title,
        cadence,
        cadenceCount,
        timeStamps: timeStampsWithNew,
      },
    });
    refetch();
  };
  const deleteGoalPress = () => {
    removeGoal({ variables: { _id } });
    refetch();
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
