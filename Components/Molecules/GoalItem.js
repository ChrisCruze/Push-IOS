import React, { useState } from "react";
import { Vibration } from "react-native";

import moment from "moment";
import GoalListItem from "../Atoms/GoalListItem";
import _ from "lodash";
import { determineOverDue, filterTimeStampsForCadence } from "../Atoms/BarChart.functions.js";
import { determineStreak } from "../Atoms/Calculations.js";

const GoalOptionsPress = ({ id, navigation, goals }) => {
  const pass_dict = { id: id, goals: goals };
  navigation.navigate("Goal", pass_dict);
};

const GoalStreakDetermine = ({ goals, id, cadence }) => {
  const timeStamps =
    goals.find(function(D) {
      return D["id"] == id;
    })["timeStamps"] || [];
  const streak_text = determineStreak({ timeStamps, cadence });
  // console.log({ cadence, timeStamps, streak_text });
  return ""; //streak_text;
};
const GoalCountGet = ({ goals, id, cadence }) => {
  const timeStamps =
    goals.find(function(D) {
      return D["id"] == id;
    })["timeStamps"] || [];
  const filteredTimeStamps = filterTimeStampsForCadence({ timeStamps, cadence });
  const totalCount = filteredTimeStamps.length;
  return totalCount;
};

const GoalLastTimeStamp = ({ goals, id }) => {
  const goals_filtered =
    goals.find(function(D) {
      return D["id"] == id;
    })["timeStamps"] || [];
  const lastTimeStamp = _.max(goals_filtered, function(timeStamp) {
    return moment(timeStamp).unix();
  });
  return lastTimeStamp;
};

const lastTimeStampMessageCreate = lastTimeStamp => {
  return moment(lastTimeStamp).format("M/DD(ddd) h:mma"); //fromNow();
};

const GoalItem = ({
  id,
  _id,
  cadence,
  timeStamps,
  title,
  goals,
  cadenceCount,
  navigation,
  updateGoal,
  removeGoal,
  refetch,
  goalsListConfetti,
}) => {
  const totalCount = GoalCountGet({ goals, id, cadence });
  const streakText = GoalStreakDetermine({ goals, id, cadence });
  const lastTimeStamp = GoalLastTimeStamp({ goals, id });
  const lastTimeStampMessage = lastTimeStampMessageCreate(lastTimeStamp);
  const is_overdue = determineOverDue({ cadence, cadenceCount, goals, id });

  const navigateToGoal = () => {
    GoalOptionsPress({ id, navigation, goals });
  };

  const pushGoalPress = () => {
    const timeStampsWithNew = timeStamps.concat(moment().format());
    updateGoal({
      variables: {
        _id,
        title,
        cadence,
        cadenceCount,
        timeStamps: timeStampsWithNew,
      },
    });
    Vibration.vibrate();
    refetch();
    goalsListConfetti();
  };
  const deleteGoalPress = () => {
    removeGoal({ variables: { _id } });
    refetch();
  };

  return (
    <GoalListItem
      navigateToGoal={navigateToGoal}
      pushGoal={pushGoalPress}
      deleteGoal={deleteGoalPress}
      text={title}
      totalCount={totalCount}
      cadence={cadence}
      cadenceCount={cadenceCount}
      lastTimeStamp={lastTimeStamp}
      lastTimeStampMessage={lastTimeStampMessage}
      is_overdue={is_overdue}
      streakText={streakText}
    />
  );
};

export default GoalItem;
