import React, { useState, Fragment } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  Animated,
  TouchableHighlight,
} from "react-native";
import Constants from "expo-constants";
import ButtonNeomorph from "../Atoms/ButtonNeomorph";
import { useGoalsPull, useGoalUpdate, useGoalDelete } from "../../API";
import _ from "lodash";
import { SwipeListView } from "react-native-swipe-list-view";
import moment from "moment";
import { number } from "prop-types";

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
  const [timeStampsState, updateTimeStampsState] = useState(timeStamps);
  const timeStampsSorted = timeStampsSort({ timeStamps: timeStampsState });
  const timeStampArray = _.map(timeStampsSorted, function(i, num) {
    return { key: num, text: i };
  });
  const [currentKey, updateCurrentKey] = useState(undefined);

  const [animationIsRunning, updateAnimationIsRunning] = useState(false);
  const { updateGoal } = useGoalUpdate();
  const { goals, refetch } = useGoalsPull();

  const rowTranslateAnimatedValues = {};
  timeStampArray.forEach((_, i) => {
    rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
  });

  const deleteTimeStamp = timeStampsUpdated => {
    console.log({ timeStampsUpdated });
    updateGoal({
      variables: {
        _id,
        title,
        cadence,
        cadenceCount,
        timeStamps: timeStampsUpdated,
      },
    });
    console.log({ timeStampsUpdated });
    updateTimeStampsState(timeStampsUpdated);
    refetch();
  };

  const onSwipeValueChange = swipeData => {
    const { key, value } = swipeData;
    if (parseInt(value) < -Dimensions.get("window").width && animationIsRunning == false) {
      updateAnimationIsRunning(true);
      console.log({ swipeData });
      const timeStampsUpdatedArray = timeStampsWithRemoved({ listData: timeStampArray, key });
      const timeStampsUpdated = _.map(timeStampsUpdatedArray, "text");
      const time_stamp_length = timeStampsUpdated.length;
      console.log({ time_stamp_length, timeStampsUpdated });
      deleteTimeStamp(timeStampsUpdated);
      // Animated.timing(rowTranslateAnimatedValues[key], {
      //   toValue: 0,
      //   duration: 200,
      // }).start(() => {
      //   updateAnimationIsRunning(false);

      //   // const timeStampsUpdatedArray = timeStampsWithRemoved({ listData: timeStampArray, key });
      //   // const timeStampsUpdated = _.map(timeStampsUpdatedArray, "text");
      //   // // deleteTimeStamp(timeStampsUpdated);
      //   // rowTranslateAnimatedValues[key].setV;
      // });
    }
    // if (parseInt(value) < -Dimensions.get("window").width && animationIsRunning == false) {

    //   updateAnimationIsRunning(true);
    //   Animated.timing(rowTranslateAnimatedValues[key], {
    //     toValue: 0,
    //     duration: 200,
    //   }).start(() => {
    //     updateAnimationIsRunning(false);

    //     const timeStampsUpdatedArray = timeStampsWithRemoved({ listData: timeStampArray, key });
    //     const timeStampsUpdated = _.map(timeStampsUpdatedArray, "text");
    //     // deleteTimeStamp(timeStampsUpdated);
    //     // rowTranslateAnimatedValues[key].setV;
    //   });
    // }
  };
  const renderHiddenItem = () => (
    <View style={styles.rowBack}>
      <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
        <Text style={styles.backTextWhite}>Delete</Text>
      </View>
    </View>
  );

  const renderItem = data => {
    const time_stamp_formatted = moment(data.item.text).format("M/DD(ddd) h:mma");
    return (
      <Animated.View style={[styles.rowFrontContainer]}>
        <TouchableHighlight
          onPress={() => console.log("You touched me")}
          style={styles.rowFront}
          underlayColor={"#AAA"}
        >
          <View>
            <Text> {time_stamp_formatted} </Text>
          </View>
        </TouchableHighlight>
      </Animated.View>
    );
  };

  return (
    <View style={styles.row_container}>
      <SwipeListView
        disableRightSwipe
        data={timeStampArray}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-Dimensions.get("window").width}
        previewRowKey={"0"}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onSwipeValueChange={onSwipeValueChange}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  row_container: {
    flexDirection: "row",
    backgroundColor: "#ECF0F3",
    justifyContent: "center",
    marginTop: 50,
  },
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  backTextWhite: {
    color: "#FFF",
  },
  rowFront: {
    alignItems: "center",
    backgroundColor: "#ECF0F3",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    justifyContent: "center",
    height: 50,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "red",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
  },
});
export default GoalTimeStamps;
