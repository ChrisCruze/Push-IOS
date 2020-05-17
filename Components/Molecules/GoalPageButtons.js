import React, { useState, Fragment } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Constants from "expo-constants";
import ButtonNeomorph from "../Atoms/ButtonNeomorph";
import { useGoalsPull, useGoalUpdate, useGoalDelete } from "../../API";

const GoalPageButtons = ({ _id, navigation }) => {
  const { removeGoal } = useGoalDelete();

  const editGoal = () => {
    navigation.navigate("editGoal", { _id: _id });
  };
  const deleteGoal = () => {
    removeGoal({ variables: { _id } });
    navigation.navigate("Goals");
  };

  return (
    <View style={styles.row_container}>
      <ButtonNeomorph text={"Delete"} onPress={deleteGoal} />
      <ButtonNeomorph text={"Edit"} onPress={editGoal} />
    </View>
  );
};
const styles = StyleSheet.create({
  row_container: {
    flexDirection: "row",
    backgroundColor: "#ECF0F3",
    justifyContent: "center",
  },
});
export default GoalPageButtons;
