import React from "react";
import { StyleSheet, View, Vibration } from "react-native";
import moment from "moment";
import ButtonNeomorph from "../Atoms/ButtonNeomorph";
import { useGoalUpdate, useGoalDelete } from "../../API";

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
    Vibration.vibrate();
    const timeStampsWithNew = timeStamps.concat(moment().format());
    updateGoal({
      variables: {
        _id,
        title,
        cadence,
        cadenceCount,
        timeStamps: timeStampsWithNew,
      },
    })
      .then(() => refetch())
      .catch(e => console.error(e));
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
    justifyContent: "space-around",
  },
});
export default GoalPageButtons;
