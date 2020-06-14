import React from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
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

const DashboardTimeStamp = ({
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
  setModalVisible,
  navigation,
  updateTimeStampConfig,
  setDate,
  date,
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
  };
  const updateTimeStamp = () => {
    setModalVisible(true);
    updateTimeStampConfig({ timeStamps, timeStamp, _id, title, cadence, cadenceCount });
    setDate(moment(timeStamp).toDate());
  };
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <Text>{time_stamp_formatted}</Text>
      <TouchableWithoutFeedback onPress={deleteTimeStamp}>
        <Icon name="trash" size={25} {...{ color: "black" }} />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={updateTimeStamp}>
        <Icon name="edit" size={25} {...{ color: "black" }} />
      </TouchableWithoutFeedback>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#ECF0F3",
    flex: 1,
    marginTop: 15,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});

export default DashboardTimeStamp;
