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
  return `Avast Ye - ye just a new personal record of ${time_stamp_count} pushes for a single goal `;
};

const standardText = ({ time_stamp_count, streakCount }) => {
  return `You have ${time_stamp_count} pushes and streak of ${streakCount}`;
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
}) => {
  const time_stamp_count = timeStampsWithNew.length;
  const streakCount = determineStreak({ timeStamps: timeStampsWithNew, cadence });
  const maxPushCount = maxPushCountofGoals({ goals });

  if (determineIfFirstPush({ time_stamp_count })) {
    const text = firstPushText();
    setModalState({ text, visible: true });
  } else if (determineIfStreak({ streakCount })) {
    const text = streakText({ streakCount, cadence });
    setModalState({ text, visible: true });
  } else if (determineIfMaxPushCount({ time_stamp_count, maxPushCount })) {
    const text = maxPushesText({ time_stamp_count });
    setModalState({ text, visible: true });
  } else if (determineIf10Threshold({ time_stamp_count })) {
    const text = tenThresholdText({ time_stamp_count });
    setModalState({ text, visible: true });
  } else {
    const text = standardText({ time_stamp_count, streakCount });
    const onPress = () => {
      setModalState({ text, visible: true, time_stamp_count, streakCount });
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
const NotificationsState = ({ setModalState, timeStampsWithNew, cadence, goals, popup, title }) => {
  return new Promise((resolve, reject) => {
    NotificationsStateLogic({
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
