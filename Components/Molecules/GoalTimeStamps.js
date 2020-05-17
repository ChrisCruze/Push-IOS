import React, { useState, Fragment } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  FlatList,
  Animated,
  TouchableHighlight,
} from "react-native";
import _ from "lodash";
import moment from "moment";
import GoalTimeStamp from "../Atoms/GoalTimeStamp";

const timeStampsSort = ({ timeStamps }) => {
  const sorted_time_stamps = _.sortBy(timeStamps, function(i) {
    return moment(i).unix();
  });
  sorted_time_stamps.reverse();
  return sorted_time_stamps;
};

const timeStampsWithRemoved = ({ listData, key }) => {
  const newData = [...listData];
  const prevIndex = listData.findIndex(item => item.key === key);
  newData.splice(prevIndex, 1);
  return newData;
};

const GoalTimeStamps = ({ _id, title, cadence, cadenceCount, timeStamps }) => {
  const timeStampsSorted = timeStampsSort({ timeStamps: timeStamps });
  const timeStampArray = _.map(timeStampsSorted, function(i, num) {
    return { key: moment(i).unix(), timeStamp: i };
  });
  console.log({ _id, title, cadence, cadenceCount, timeStamps });
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
