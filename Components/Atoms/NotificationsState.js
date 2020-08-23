import { determineStreak, maxPushCountofGoals, determineStreakLongest } from "./Calculations";

const determineIfFirstPush = ({ time_stamp_count }) => {
  return time_stamp_count == 1;
};

const roundNumber = (x, divisor) => {
  return Math.ceil(x / divisor) * divisor;
};

const determineIfStreak = ({ streakCount }) => {
  const is_divisible_by_5 = roundNumber(streakCount, 5) == streakCount;
  return streakCount == 2 || is_divisible_by_5 & (streakCount > 2);
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
  return `Yo Ho Ho - you're on ${streakCount} ${cadence} streak`;
};

const tenThresholdText = ({ time_stamp_count }) => {
  return `Ahoy - ye just reached ${time_stamp_count} pushes`;
};

const maxPushesText = ({ time_stamp_count }) => {
  return `Avast Ye - ye just achieved a new personal record of ${time_stamp_count} pushes for a single goal `;
};

const standardText = ({ time_stamp_count, streakCount }) => {
  return `Yo Ho Ho - you just reached ${time_stamp_count} pushes. You're also on a streak of ${streakCount}`;
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

  if (determineIfFirstPush({ time_stamp_count })) {
    const text = firstPushText();
    showModal(text);
  } else if (determineIfStreak({ streakCount })) {
    const text = streakText({ streakCount, cadence });
    showModal(text);
  } else if (determineIfMaxPushCount({ time_stamp_count, maxPushCount })) {
    const text = maxPushesText({ time_stamp_count });
    showModal(text);
  } else if (determineIf10Threshold({ time_stamp_count })) {
    const text = tenThresholdText({ time_stamp_count });
    showModal(text);
  } else {
    const text = standardText({ time_stamp_count, streakCount });
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
