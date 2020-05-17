import React, { useState, Fragment, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  FlatList,
  Animated,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";
import _ from "lodash";
import moment from "moment";
import { Feather as Icon, Ionicons, FontAwesome } from "@expo/vector-icons";

const timeStampsWithRemoved = ({ timeStamps, timeStamp }) => {
  const timeStampsCopy = [...timeStamps];
  const prevIndex = timeStampsCopy.findIndex(item => item === timeStamp);

  const timeStampsCopyFiltered = timeStampsCopy.filter(function(i, num) {
    return num !== prevIndex;
  });
  return timeStampsCopyFiltered;
};

const GoalTimeStamp = ({
  timeStamp,
  key,
  _id,
  title,
  cadence,
  cadenceCount,
  timeStamps,
  timeStampArray,
  updateGoal,
  refetch,
  navigation,
}) => {
  const time_stamp_formatted = moment(timeStamp).format("M/DD(ddd) h:mma");

  const deleteTimeStamp = () => {
    const timeStampsUpdated = timeStampsWithRemoved({ timeStamps, timeStamp });
    updateGoal({
      variables: {
        _id,
        title,
        cadence,
        cadenceCount,
        timeStamps: timeStampsUpdated,
      },
    });
    refetch();
    // const pass_dict = { id: _id };
    // navigation.navigate("Goal", pass_dict);
  };
  return (
    <View style={styles.container}>
      <Text>{time_stamp_formatted}</Text>
      <TouchableWithoutFeedback onPress={deleteTimeStamp}>
        <Icon name="trash" size={25} {...{ color: "black" }} />
      </TouchableWithoutFeedback>
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
