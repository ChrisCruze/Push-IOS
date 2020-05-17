import React, { useState, Fragment } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Constants from "expo-constants";
import ButtonNeomorph from "../Atoms/ButtonNeomorph";
import { useGoalsPull, useGoalUpdate, useGoalDelete } from "../../API";
import _ from "lodash";
import moment from "moment";
const GoalPageButtons = ({
  _id,
  navigation,
  title,
  cadence,
  cadenceCount,
  timeStamps,
  refetch,
}) => {
  const { removeGoal } = useGoalDelete();
  const { updateGoal } = useGoalUpdate();

  const editGoal = () => {
    navigation.navigate("editGoal", { _id: _id });
  };
  const deleteGoal = () => {
    removeGoal({ variables: { _id } });
    navigation.navigate("Goals");
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

  return (
    <View style={styles.row_container}>
      <ButtonNeomorph text={"Push"} onPress={pushGoalPress} />

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
