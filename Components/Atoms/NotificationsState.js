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
}) => {
  const time_stamp_count = timeStampsWithNew.length;
  const streakCount = determineStreak({ timeStamps: timeStampsWithNew, cadence });
  const maxPushCount = maxPushCountofGoals({ goals });

  const showModal = text => {
    setModalState({ text, visible: true, time_stamp_count, streakCount });
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
