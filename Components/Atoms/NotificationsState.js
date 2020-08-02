import React, { useState } from "react";
import { determineStreak, maxPushCountofGoals } from "./Calculations";

const determineIfFirstPush = ({ time_stamp_count }) => {
  return time_stamp_count == 1;
};
const determineIfStreak = ({ streakCount }) => {
  return streakCount > 1;
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
  return `Avast Ye - ye just a new personal record of ${time_stamp_count} for a single goal `;
};

const NotificationsStateCreate = ({ time_stamp_count, streakCount, cadence, maxPushCount }) => {
  if (determineIfFirstPush({ time_stamp_count })) {
    return { text: firstPushText() };
  }
  // else if (determineIfStreak({ streakCount })) {
  //   return { text: streakText({ streakCount, cadence }) };
  // }
  else if (determineIfMaxPushCount({ time_stamp_count, maxPushCount })) {
    return { text: maxPushesText({ time_stamp_count }) };
  } else if (determineIf10Threshold({ time_stamp_count })) {
    return { text: tenThresholdText({ time_stamp_count }) };
  } else {
    return null;
  }
};

const NotificationMetrics = ({ timeStampsWithNew, cadence, goals }) => {
  const time_stamp_count = timeStampsWithNew.length;
  const streakCount = determineStreak({ timeStamps: timeStampsWithNew, cadence });
  const maxPushCount = maxPushCountofGoals({ goals });
  return { time_stamp_count, streakCount, maxPushCount };
};

const notificationModalUpdate = ({
  setModalState,
  notificationState,
  time_stamp_count,
  streakCount,
}) => {
  setModalState({ ...notificationState, visible: true, time_stamp_count, streakCount });
};

const notificationPopUpUpdate = ({ popup, time_stamp_count, streakCount, title }) => {
  popup.show({
    onPress: function() {
      console.log("Pressed");
    },
    appIconSource: require("../../assets/images/logo.jpg"),
    // appTitle: "Some App",
    timeText: "Now",
    title: title,
    body: `You have ${time_stamp_count} pushes and streak of ${streakCount}`,
    slideOutTime: 5000,
  });
};
const NotificationsModalStateBase = ({
  timeStampsWithNew,
  cadence,
  goals,
  setModalState,
  popup,
  title,
}) => {
  const { time_stamp_count, streakCount, maxPushCount } = NotificationMetrics({
    timeStampsWithNew,
    cadence,
    goals,
  });
  const notificationState = NotificationsStateCreate({
    time_stamp_count,
    streakCount,
    cadence,
    maxPushCount,
  });
  if (notificationState != null) {
    notificationModalUpdate({ setModalState, notificationState, time_stamp_count, streakCount });
  } else {
    notificationPopUpUpdate({ popup, time_stamp_count, streakCount, title });
  }
};
const NotificationsState = ({ setModalState, timeStampsWithNew, cadence, goals, popup, title }) => {
  return new Promise((resolve, reject) => {
    NotificationsModalStateBase({
      setModalState,
      timeStampsWithNew,
      cadence,
      goals,
      popup,
      title,
    });
    resolve();
  });
};
export default NotificationsState;
