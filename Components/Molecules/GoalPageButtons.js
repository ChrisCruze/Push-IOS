import React from "react";
import { StyleSheet, View, Vibration, Alert } from "react-native";
import moment from "moment";
import ButtonNeomorph from "../Atoms/ButtonNeomorph";
import { useGoalUpdate, useGoalDelete } from "../../API";
import NotificationsState from "../Atoms/NotificationsState";

const GoalPageButtons = ({
  _id,
  navigation,
  title,
  cadence,
  cadenceCount,
  timeStamps,
  refetch,
  setModalState,
  goals,
  popup,
}) => {
  const { removeGoal } = useGoalDelete();
  const { updateGoal } = useGoalUpdate();

  const editGoal = () => {
    navigation.navigate("editGoal", { _id: _id });
  };
  const deleteGoal = () => {
    Alert.alert(
      "Are you sure you want to delete this goal?",
      title,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            removeGoal({ variables: { _id } });
            navigation.navigate("Goals");
          },
        },
      ],
      { cancelable: false },
    );
  };

  const pushGoalPress = () => {
    Vibration.vibrate();
    const timeStampsWithNew = timeStamps.concat(moment().format());

    NotificationsState({
      setModalState,
      timeStampsWithNew,
      cadence,
      goals,
      popup,
      title,
    })
      .then(
        updateGoal({
          variables: {
            _id,
            title,
            cadence,
            cadenceCount,
            timeStamps: timeStampsWithNew,
          },
        }),
      )
      .then(() => refetch())
      .catch(e => console.error(e));
  };

  return (
    <View style={styles.row_container}>
      <ButtonNeomorph text={"Push"} onPress={pushGoalPress} />
      <ButtonNeomorph text={"Delete"} onPress={() => deleteGoal()} />
      <ButtonNeomorph text={"Edit"} onPress={editGoal} />
    </View>
  );
};
const styles = StyleSheet.create({
  row_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 30,
  },
});
export default GoalPageButtons;
