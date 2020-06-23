import React, { useState } from "react";

import {
  FlatList,
  Text,
  StyleSheet,
  View,
  Animated,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import NotificationsHeader from "../Molecules/NotificationsHeader";
import { useGoalsPull } from "../../API";
import AnimatedLoading from "../Molecules/AnimatedLoading";
import NetworkCheckNav from "../Molecules/NetworkCheckNav";
import NotificationsList from "../Molecules/NotificationsList";

const Notifications = ({ navigation }) => {
  const { goals, refetch, loading, networkStatus } = useGoalsPull();
  const [scrollAnimation] = useState(new Animated.Value(0));
  NetworkCheckNav({ networkStatus, navigation });

  return (
    <View style={styles.container}>
      <NotificationsHeader
        onPress={() => {
          navigation.navigate("Goals");
        }}
      />
      <AnimatedLoading scrollAnimation={scrollAnimation} loading={loading} refetch={refetch} />
      <NotificationsList goals={goals} scrollAnimation={scrollAnimation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    borderColor: "black",
    borderWidth: 1,
    marginTop: 25,
    marginBottom: 30,
  },
});

export default Notifications;
