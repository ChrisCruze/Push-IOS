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

const GoalTimeStamp = ({
  timeStamp,
  key,
  _id,
  title,
  cadence,
  cadenceCount,
  timeStamps,
  timeStampArray,
}) => {
  const time_stamp_formatted = moment(timeStamp).format("M/DD(ddd) h:mma");

  return (
    <View style={styles.container}>
      <Text>{time_stamp_formatted}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ECF0F3",
    flex: 1,
    marginTop: 15,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});

export default GoalTimeStamp;
