import React from "react";
import { Vibration } from "react-native";
import moment from "moment";
import _ from "lodash";
import GoalListItem from "../Atoms/GoalListItem";
import { determineOverDue, filterTimeStampsForCadence } from "../Atoms/BarChart.functions.js";
import { determineStreak } from "../Atoms/Calculations";

const GoalOptionsPress = ({ id, navigation, goals }) => {
  const pass_dict = { id: id, goals: goals };
  navigation.navigate("Goal", pass_dict);
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

const GoalSubTitleTextBasic = ({ totalCount, cadenceCount, cadence }) => {
  return `${totalCount}/${cadenceCount} (${cadence})`;
};

const GoalSubTitleTextStreak = ({ streakCount, totalCount, cadenceCount, cadence }) => {
  const cadenceText = cadence == "Daily" ? "Day" : cadence == "Weekly" ? "Wk" : "Mo";
  return `${streakCount} ${cadenceText} Streak | ${totalCount}/${cadenceCount}`;
};
const GoalSubTitleText = ({ totalCount, cadenceCount, cadence, timeStamps, is_overdue }) => {
  const streakCount = determineStreak({ timeStamps, cadence });
  const showStreakCount = streakCount > 1 && !is_overdue;
  if (showStreakCount) {
    return GoalSubTitleTextStreak({ streakCount, totalCount, cadenceCount, cadence });
  } else {
    return GoalSubTitleTextBasic({ totalCount, cadenceCount, cadence });
  }
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
  const lastTimeStamp = GoalLastTimeStamp({ goals, id });
  const lastTimeStampMessage = lastTimeStampMessageCreate(lastTimeStamp);
  const is_overdue = determineOverDue({ cadence, cadenceCount, goals, id });
  const subTitle = GoalSubTitleText({ totalCount, cadenceCount, cadence, timeStamps, is_overdue });

  const navigateToGoal = () => {
    GoalOptionsPress({ id, navigation, goals });
  };
  const navigateToEditGoal = () => {
    navigation.navigate("editGoal", { _id: _id });
  };
  const pushGoalPress = () => {
    Vibration.vibrate();
    const timeStampsWithNew = timeStamps.concat(moment().format());

    return updateGoal({
      variables: {
        _id,
        title,
        cadence,
        cadenceCount,
        timeStamps: timeStampsWithNew,
      },
    })
      .then(() => refetch())
      .then(() => {
        if (totalCount + 1 == cadenceCount) {
          goalsListConfetti();
        }
      })
      .catch(e => console.error(e));
  };
  const deleteGoalPress = () => {
    removeGoal({ variables: { _id } });
    refetch();
  };

  return (
    <GoalListItem
      navigateToGoal={navigateToGoal}
      navigateToEditGoal={navigateToEditGoal}
      pushGoal={pushGoalPress}
      deleteGoal={deleteGoalPress}
      text={title}
      totalCount={totalCount}
      cadence={cadence}
      cadenceCount={cadenceCount}
      lastTimeStamp={lastTimeStamp}
      lastTimeStampMessage={lastTimeStampMessage}
      is_overdue={is_overdue}
      subTitle={subTitle}
    />
  );
};

export default GoalItem;
