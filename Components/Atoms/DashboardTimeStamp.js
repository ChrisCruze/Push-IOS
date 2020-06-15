import React from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback, Alert, Button } from "react-native";
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
    Alert.alert(
      "Are you sure you want to delete?",
      time_stamp_formatted,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
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
          },
        },
      ],
      { cancelable: false },
    );
  };
  const updateTimeStamp = () => {
    setModalVisible(true);
    updateTimeStampConfig({ timeStamps, timeStamp, _id, title, cadence, cadenceCount });
    setDate(moment(timeStamp).toDate());
    refetch();
  };
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <Text>{time_stamp_formatted}</Text>

      <TouchableWithoutFeedback onPress={updateTimeStamp}>
        <Icon name="edit" size={25} {...{ color: "black" }} />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={deleteTimeStamp}>
        <Icon name="trash" size={25} {...{ color: "black" }} />
      </TouchableWithoutFeedback>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    marginBottom: 15,
    marginHorizontal: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default DashboardTimeStamp;
