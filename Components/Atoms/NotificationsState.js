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
  return `Aye, Aye - you got your first push matey!`;
};

const streakText = ({ streakCount, cadence }) => {
  const cadenceText = cadenceTextConvert(cadence);
  return `Yo Ho Ho - you're on ${streakCount} ${cadenceText} streak`;
};

const tenThresholdText = ({ time_stamp_count }) => {
  return `Ahoy - ye just reached ${time_stamp_count} pushes`;
};

const maxPushesText = ({ time_stamp_count }) => {
  return `Avast Ye - ye just achieved a new personal record of ${time_stamp_count} pushes for a single goal `;
};

const standardText = ({ time_stamp_count, streakCount }) => {
  return `Yo Ho Ho - you just reached ${time_stamp_count} pushes.`;
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

const NotificationTextDetermine = ({ time_stamp_count, streakCount, cadence, maxPushCount }) => {
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

const NotificationDetermineCadenceComplete = ({ goals }) => {
  const day_goals = GoalsFilterCadence({ goals, cadence: "daily" });
  const week_goals = GoalsFilterCadence({ goals, cadence: "weekly" });
  const month_goals = GoalsFilterCadence({ goals, cadence: "monthly" });
  const is_day_completed = determinePercentageDone(day_goals) == 100;
  const is_week_completed = determinePercentageDone(week_goals) == 100;
  const is_month_completed = determinePercentageDone(month_goals) == 100;
  const is_all_completed = determinePercentageDone(goals) == 100;
  if (is_all_completed) {
    return "You Completed all of your goals!";
  } else if (is_day_completed) {
    return "You Completed all of your Daily goals!";
  } else if (is_week_completed) {
    return "You Completed all of your Weekly goals!";
  } else if (is_month_completed) {
    return "You Completed all of your Monthly goals!";
  } else {
    return false;
  }
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
  //const text = NotificationTextDetermine({ time_stamp_count, streakCount, cadence, maxPushCount });
  const text = NotificationDetermineCadenceComplete({ goals });
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
