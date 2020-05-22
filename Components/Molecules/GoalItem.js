import React, { useState } from "react";
import { Vibration } from "react-native";

import moment from "moment";
import GoalListItem from "../Atoms/GoalListItem";
import _ from "lodash";

const GoalOptionsPress = ({ id, navigation, goals }) => {
  const pass_dict = { id: id, goals: goals };
  console.log({ pass_dict });
  navigation.navigate("Goal", pass_dict);
  console.log(`navigate to options page ${id}`);
};

const GoalCountGet = ({ goals, id }) => {
  const goals_filtered =
    goals.find(function(D) {
      return D["id"] == id;
    })["timeStamps"] || [];
  const totalCount = goals_filtered.length;
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
  return moment(lastTimeStamp).fromNow();
};

function determine_number_of_days_from_now(latest_time_stamp) {
  const difference_hours = moment().diff(moment(latest_time_stamp), "hours");
  return difference_hours / 24;
}

function determine_how_long_ago_acceptable({ cadenceCount, cadence }) {
  const is_daily = String(cadence).toLowerCase() == "daily";
  const is_weekly = String(cadence).toLowerCase() == "weekly";
  const is_monthly = String(cadence).toLowerCase() == "monthly";

  const numerator = is_daily ? 1 : is_weekly ? 7 : is_monthly ? 30 : 0;
  const cadenceInt = cadenceCount == 0 ? 1 : cadenceCount;
  const calculated_days_away_acceptable = numerator / cadenceInt;
  return calculated_days_away_acceptable;
}

const determineOverDue = ({ title, cadence, cadenceCount, lastTimeStamp }) => {
  const calculated_days_away_acceptable = determine_how_long_ago_acceptable({
    cadenceCount,
    cadence,
  });
  const days_away = determine_number_of_days_from_now(lastTimeStamp);
  const is_overdue = days_away > calculated_days_away_acceptable;
  return is_overdue;
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
}) => {
  const totalCount = GoalCountGet({ goals, id });
  const lastTimeStamp = GoalLastTimeStamp({ goals, id });
  const lastTimeStampMessage = lastTimeStampMessageCreate(lastTimeStamp);
  const is_overdue = determineOverDue({ title, cadence, cadenceCount, lastTimeStamp });

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
