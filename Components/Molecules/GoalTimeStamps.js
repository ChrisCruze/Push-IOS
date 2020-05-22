import React, { useState, Fragment } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import _ from "lodash";
import moment from "moment";
import GoalTimeStamp from "../Atoms/GoalTimeStamp";
import { useGoalsPull, useGoalUpdate, useGoalDelete } from "../../API";

const timeStampsSort = ({ timeStamps }) => {
  const sorted_time_stamps = _.sortBy(timeStamps, function(i) {
    return moment(i).unix();
  });
  sorted_time_stamps.reverse();
  return sorted_time_stamps;
};

const GoalTimeStamps = ({ _id, title, cadence, cadenceCount, timeStamps, navigation }) => {
  const timeStampsSorted = timeStampsSort({ timeStamps: timeStamps });
  const timeStampArray = _.map(timeStampsSorted, function(i, num) {
    return { key: num, timeStamp: i };
  });
  const { updateGoal } = useGoalUpdate();
  const { refetch } = useGoalsPull();

  return (
    <View style={styles.container}>
      <FlatList
        data={timeStampArray}
        keyExtractor={timeStampDict => timeStampDict.key}
        renderItem={({ item }) => {
          return GoalTimeStamp({
            ...item,
            ...{ _id, title, cadence, cadenceCount, timeStamps },
            timeStampArray,
            updateGoal,
            refetch,
            navigation,
          });
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ECF0F3",

    flex: 1,
  },
});

export default GoalTimeStamps;
