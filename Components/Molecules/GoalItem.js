import React, { useState } from "react";
import { Vibration } from "react-native";

import moment from "moment";
import GoalListItem from "../Atoms/GoalListItem";
import _ from "lodash";
import { determineOverDue } from "../Atoms/BarChart.functions.js";

const GoalOptionsPress = ({ id, navigation, goals }) => {
  const pass_dict = { id: id, goals: goals };
  console.log({ pass_dict });
  navigation.navigate("Goal", pass_dict);
  console.log(`navigate to options page ${id}`);
};

const GoalCountGet = ({ goals, id }) => {
  const goals_filtered =
    goals.find(function (D) {
      return D["id"] == id;
    })["timeStamps"] || [];
    // filter for todays goals
    goals_filtered.map(date => moment(date).isSame(moment(), 'day')?date:null)
  const totalCount = goals_filtered.length;
  return totalCount;
};

const GoalLastTimeStamp = ({ goals, id }) => {
  const goals_filtered =
    goals.find(function (D) {
      return D["id"] == id;
    })["timeStamps"] || [];
  const lastTimeStamp = _.max(goals_filtered, function (timeStamp) {
    return moment(timeStamp).unix();
  });
  return lastTimeStamp;
};

const lastTimeStampMessageCreate = lastTimeStamp => {
  return moment(lastTimeStamp).fromNow();
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
  const totalCount = GoalCountGet({ goals, id });
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
      cadence={cadenceCount}
      lastTimeStamp={lastTimeStamp}
      lastTimeStampMessage={lastTimeStampMessage}
      is_overdue={is_overdue}
    />
  );
};

export default GoalItem;
