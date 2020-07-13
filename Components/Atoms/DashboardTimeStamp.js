import React from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback, Alert } from "react-native";
import moment from "moment";
import { Feather as Icon } from "@expo/vector-icons";
const timeStampsWithRemoved = ({ timeStamps, timeStamp }) => {
  const timeStampsCopy = [...timeStamps];
  const prevIndex = timeStampsCopy.findIndex(item => item === timeStamp);
  const timeStampsCopyFiltered = timeStampsCopy.filter(function (i, num) {
    return num !== prevIndex;
  });
  return timeStampsCopyFiltered;
};

const DashboardTimeStamp = ({
  timeStamp,
  _id,
  title,
  cadence,
  cadenceCount,
  timeStamps,
  updateGoal,
  refetch,
  setModalVisible,
  updateTimeStampConfig,
  setDate,
  hideTitle,
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
      <View style={styles.text}>
        {hideTitle || <Text>{title}</Text>}
        <Text>{time_stamp_formatted}</Text>
      </View>
      <View style={styles.icon}>   
        {Platform.OS == "android"?null: <TouchableWithoutFeedback onPress={updateTimeStamp}>
          <Icon name="edit" size={25} color="black" />
        </TouchableWithoutFeedback>}

        <TouchableWithoutFeedback onPress={deleteTimeStamp}>
          <Icon name="trash" size={25} color="black" />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginBottom: 15,
    marginHorizontal: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    flex: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 20,
  },
});

export default DashboardTimeStamp;
