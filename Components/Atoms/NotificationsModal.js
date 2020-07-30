import React, { useState } from "react";
import { Text } from "react-native";
import { determineStreak } from "../Atoms/Calculations";

const NotificationsModalContent = ({ timeStampsWithNew, cadence }) => {
  const time_stamp_count = timeStampsWithNew.length;
  const streakCount = determineStreak({ timeStamps: timeStampsWithNew, cadence });
  return (
    <Text>
      Count: {time_stamp_count} Streak: {streakCount}
    </Text>
  );
};

const NotificationsModal = ({ setModalContent, setModalVisible, timeStampsWithNew, cadence }) => {
  setModalContent(
    <NotificationsModalContent timeStampsWithNew={timeStampsWithNew} cadence={cadence} />,
  );
  setModalVisible(true);
};
export default NotificationsModal;
