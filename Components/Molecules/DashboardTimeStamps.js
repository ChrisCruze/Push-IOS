import React, { useState, Fragment } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import _ from "lodash";
import moment from "moment";
import DashboardTimeStamp from "../Atoms/DashboardTimeStamp";
import { useGoalsPull, useGoalUpdate, useGoalDelete } from "../../API";

import TimePickerModal from "../Atoms/TimePickerModal";

const timeStampsSort = ({ timeStamps }) => {
  const sorted_time_stamps = _.sortBy(timeStamps, function(i) {
    return moment(i.timeStamp).unix();
  });
  sorted_time_stamps.reverse();
  return sorted_time_stamps;
};
const timeStampsWithRemoved = ({ timeStamps, timeStamp }) => {
  const timeStampsCopy = [...timeStamps];
  const prevIndex = timeStampsCopy.findIndex(item => item === timeStamp);
  const timeStampsCopyFiltered = timeStampsCopy.filter(function(i, num) {
    return num !== prevIndex;
  });
  return timeStampsCopyFiltered;
};

const DashboardTimeStamps = ({ timeStamps, navigation }) => {
  const timeStampsSorted = timeStampsSort({ timeStamps: timeStamps });
  const timeStampArray = _.map(timeStampsSorted, function(i, num) {
    return { key: num, ...i };
  });
  const { updateGoal } = useGoalUpdate();
  const { refetch } = useGoalsPull();

  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(moment().toDate());
  const [timeStampConfig, updateTimeStampConfig] = useState();

  const saveTimeStamp = () => {
    const { timeStamp, timeStamps, _id, title, cadence, cadenceCount } = timeStampConfig;
    const timeStampsUpdated = timeStampsWithRemoved({ timeStamps, timeStamp });
    const newTimeStmap = moment(date).format();
    const timeStampsUpdatedEdited = [...timeStampsUpdated, newTimeStmap];
    updateGoal({
      variables: {
        _id,
        title,
        cadence,
        cadenceCount,
        timeStamps: timeStampsUpdatedEdited,
      },
    });
    setModalVisible(false);
    refetch();
  };
  return (
    <View style={styles.container}>
      <TimePickerModal
        date={date}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setDate={setDate}
        saveTimeStamp={saveTimeStamp}
      />
      <FlatList
        data={timeStampArray}
        keyExtractor={timeStampDict => timeStampDict.key}
        renderItem={({ item }) => {
          return DashboardTimeStamp({
            ...item,
            timeStampArray,
            updateTimeStampConfig,
            setModalVisible,
            date,
            setDate,
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
