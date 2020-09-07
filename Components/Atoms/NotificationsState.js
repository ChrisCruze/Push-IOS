import {
  determineStreak,
  maxPushCountofGoals,
  determineStreakLongest,
  cadenceTextConvert,
} from "./Calculations";

import { determinePercentageDone, GoalsFilterCadence } from "./BarChart.functions";
const determineIfFirstPush = ({ time_stamp_count }) => {
  return time_stamp_count == 1;
};

const roundNumber = (x, divisor) => {
  return Math.ceil(x / divisor) * divisor;
};

const determineIfStreak = ({ streakCount }) => {
  return streakCount > 2;
};

const determineIf10Threshold = ({ time_stamp_count }) => {
  const is_divisible_by_10 =
    parseFloat(parseInt(time_stamp_count / 10)) == parseFloat(time_stamp_count / 10);
  return is_divisible_by_10;
};

const determineIfMaxPushCount = ({ time_stamp_count, maxPushCount }) => {
  return time_stamp_count > maxPushCount;
};

const firstPushText = () => {
  return `You got your first push!`;
};

const streakText = ({ streakCount, cadence }) => {
  const cadenceText = cadenceTextConvert(cadence);
  return `You're on ${streakCount} ${cadenceText} streak`;
};

const tenThresholdText = ({ time_stamp_count }) => {
  return `You just reached ${time_stamp_count} pushes`;
};

const maxPushesText = ({ time_stamp_count }) => {
  return `You just achieved a new personal record of ${time_stamp_count} pushes for a single goal `;
};

const standardText = ({ time_stamp_count, streakCount }) => {
  return `You just reached ${time_stamp_count} pushes.`;
};

const notificationPopUpUpdate = ({ popup, title, onPress, body }) => {
  popup.show({
    onPress,
    appIconSource: require("../../assets/images/logo.jpg"),
    // appTitle: "Some App",
    timeText: "Now",
    title: title,
    body,
    slideOutTime: 5000,
  });
};

const NotificationTextDetermineBase = ({
  time_stamp_count,
  streakCount,
  cadence,
  maxPushCount,
  goals,
}) => {
  if (determineIfFirstPush({ time_stamp_count })) {
    const text = firstPushText();
    return text;
  } else if (determineIfStreak({ streakCount })) {
    const text = streakText({ streakCount, cadence });
    return text;
  } else if (determineIfMaxPushCount({ time_stamp_count, maxPushCount })) {
    const text = maxPushesText({ time_stamp_count });
    return text;
  } else if (determineIf10Threshold({ time_stamp_count })) {
    const text = tenThresholdText({ time_stamp_count });
    return text;
  } else {
    const text = standardText({ time_stamp_count, streakCount });
    return text;
  }
};

const NotificationTextDetermine = ({
  time_stamp_count,
  streakCount,
  cadence,
  maxPushCount,
  goals,
  _id,
  timeStampsWithNew,
}) => {
  const text = NotificationTextDetermineBase({
    time_stamp_count,
    streakCount,
    cadence,
    maxPushCount,
    goals,
  });
  const updated_goals = appendNewGoalsTimeStamps({ goals, _id, timeStampsWithNew });
  const percenage_done = determinePercentageDone(updated_goals);
  return text + " " + percenage_done + "% completed!";
};
const appendNewGoalsTimeStamps = ({ goals, _id, timeStampsWithNew }) => {
  const goals_filtered = goals.filter(goal => goal._id != _id);
  const goal_updated_dict = goals.find(goal => goal._id == _id);
  const goal_updated_dict_with_timestamps = { ...goal_updated_dict, timeStamps: timeStampsWithNew };
  const combined_goals = [...goals_filtered, goal_updated_dict_with_timestamps];
  return combined_goals;
};

const NotificationDetermineCadenceComplete = ({ goals, cadence, timeStampsWithNew, _id }) => {
  const updated_goals = appendNewGoalsTimeStamps({ goals, _id, timeStampsWithNew });
  const day_goals = GoalsFilterCadence({ goals: updated_goals, cadence: "daily" });
  const week_goals = GoalsFilterCadence({ goals: updated_goals, cadence: "weekly" });
  const month_goals = GoalsFilterCadence({ goals: updated_goals, cadence: "monthly" });
  const is_day_completed = determinePercentageDone(day_goals) == 100 && cadence == "Daily";
  const is_week_completed = determinePercentageDone(week_goals) == 100 && cadence == "Weekly";
  const is_month_completed = determinePercentageDone(month_goals) == 100 && cadence == "Monthly";
  const is_all_completed = determinePercentageDone(updated_goals) == 100;
  if (is_all_completed) {
    return "Avast Ye - you completed all of your goals!";
  } else if (is_day_completed) {
    return "Avast Ye - you Completed all of your daily goals!";
  } else if (is_week_completed) {
    return "Avast Ye - you Completed all of your weekly goals!";
  } else if (is_month_completed) {
    return "Avast Ye -you Completed all of your monthly goals!";
  } else {
    return false;
  }
};

const NotificationsStateLogicInApp = ({
  timeStampsWithNew,
  cadence,
  goals,
  setModalState,
  popup,
  title,
  navigation,
  _id,
}) => {
  const time_stamp_count = timeStampsWithNew.length;
  const streakCount = determineStreak({ timeStamps: timeStampsWithNew, cadence });
  const maxPushCount = maxPushCountofGoals({ goals });
  const longest_streak = determineStreakLongest({ timeStamps: timeStampsWithNew, cadence });

  const navigateToGoal = () => {
    const pass_dict = { id: _id };
    navigation.navigate("Goal", pass_dict);
  };
  const showModal = text => {
    setModalState({
      text,
      visible: true,
      time_stamp_count,
      streakCount,
      longest_streak,
      title,
      navigateToGoal,
    });
  };
  const text = NotificationTextDetermine({
    time_stamp_count,
    streakCount,
    cadence,
    maxPushCount,
    goals,
    _id,
    timeStampsWithNew,
  });
  const onPress = () => {
    showModal(text);
  };
  notificationPopUpUpdate({
    popup,
    time_stamp_count,
    streakCount,
    title,
    onPress,
    body: text,
  });
};
const NotificationsStateLogicModal = ({
  timeStampsWithNew,
  cadence,
  goals,
  setModalState,
  popup,
  title,
  navigation,
  _id,
  text,
}) => {
  const time_stamp_count = timeStampsWithNew.length;
  const streakCount = determineStreak({ timeStamps: timeStampsWithNew, cadence });
  const maxPushCount = maxPushCountofGoals({ goals });
  const longest_streak = determineStreakLongest({ timeStamps: timeStampsWithNew, cadence });
  const navigateToGoal = () => {
    const pass_dict = { id: _id };
    navigation.navigate("Goal", pass_dict);
  };
  setModalState({
    text,
    visible: true,
    time_stamp_count,
    streakCount,
    longest_streak,
    title,
    navigateToGoal,
  });

  setTimeout(() => {
    setModalState({
      text,
      visible: false,
      time_stamp_count,
      streakCount,
      longest_streak,
      title,
      navigateToGoal,
    });
  }, 4000);
};

const NotificationsStateLogic = ({
  timeStampsWithNew,
  cadence,
  goals,
  setModalState,
  popup,
  title,
  navigation,
  _id,
}) => {
  const modal_text = NotificationDetermineCadenceComplete({
    goals,
    cadence,
    timeStampsWithNew,
    _id,
  });
  if (modal_text != false) {
    NotificationsStateLogicModal({
      setModalState,
      timeStampsWithNew,
      cadence,
      goals,
      popup,
      title,
      navigation,
      _id,
      text: modal_text,
    });
  } else {
    NotificationsStateLogicInApp({
      setModalState,
      timeStampsWithNew,
      cadence,
      goals,
      popup,
      title,
      navigation,
      _id,
    });
  }
};

const NotificationsState = ({
  setModalState,
  timeStampsWithNew,
  cadence,
  goals,
  popup,
  title,
  navigation,
  _id,
}) => {
  return new Promise((resolve, reject) => {
    NotificationsStateLogic({
      setModalState,
      timeStampsWithNew,
      cadence,
      goals,
      popup,
      title,
      navigation,
      _id,
    });
    resolve();
  });
};
export default NotificationsState;
