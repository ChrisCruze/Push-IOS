import React, { useState, Fragment } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import _ from "lodash";
import moment from "moment";
import DashboardTimeStamp from "../Atoms/DashboardTimeStamp";
import { useGoalsPull, useGoalUpdate, useGoalDelete } from "../../API";

const timeStampsSort = ({ timeStamps }) => {
  const sorted_time_stamps = _.sortBy(timeStamps, function(i) {
    return moment(i.timeStamp).unix();
  });
  sorted_time_stamps.reverse();
  return sorted_time_stamps;
};

const DashboardTimeStamps = ({ timeStamps, navigation }) => {
  const timeStampsSorted = timeStampsSort({ timeStamps: timeStamps });
  const timeStampArray = _.map(timeStampsSorted, function(i, num) {
    return { key: num, ...i };
  });
  const { updateGoal } = useGoalUpdate();
  const { refetch } = useGoalsPull();
  return (
    <View style={styles.container}>
      <FlatList
        data={timeStampArray}
        keyExtractor={timeStampDict => timeStampDict.key}
        renderItem={({ item }) => {
          return DashboardTimeStamp({
            ...item,
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
    flex: 1,
  },
});

export default DashboardTimeStamps;
