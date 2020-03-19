import React, { useState } from "react";
import { View, StyleSheet, Dimensions, FlatList, TouchableOpacity, Image } from "react-native";
import Constants from "expo-constants";
import { Feather as Icon } from "@expo/vector-icons";
import APIStore from "../Atoms/APIStore";
import Theme from "../Atoms/Theme";
import Text from "../Atoms/Text";
import Images from "../Atoms/Images";
import FirstPost from "../Atoms/FirstPost";
import GoalItem from "../Molecules/GoalItem";
import DashboardSummary from "../Organisms/DashboardSummary";
const Profile = ({ navigation }) => {
  const logout = () => navigation.navigate("Login");

  const uid = APIStore.me();
  const goals = APIStore.goals();
  const profile = APIStore.profile(uid);

  // const [internalState, setInternalState] = useState(goals);
  // const createNewGoal = newGoal => {
  //   setInternalState([...internalState, newGoal]);
  // };
  return (
    <FlatList
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      data={goals}
      keyExtractor={goal => goal.id}
      renderItem={({ item }) => GoalItem({ ...item, navigation })}
      ListEmptyComponent={
        <View style={styles.post}>
          <FirstPost {...{ navigation }} />
        </View>
      }
      ListHeaderComponent={<DashboardSummary goals={goals} logout={logout} profile={profile} />}
    />
  );
};

const avatarSize = 100;
const { width } = Dimensions.get("window");
const { statusBarHeight } = Constants;
const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  post: {
    paddingHorizontal: Theme.spacing.small,
  },
  header: {
    marginBottom: avatarSize * 0.5 + Theme.spacing.small,
    height: width,
  },
  cover: {
    ...StyleSheet.absoluteFillObject,
    width,
    height: width,
  },
  avatar: {
    position: "absolute",
    right: Theme.spacing.small,
    bottom: -avatarSize * 0.5,
  },
  settings: {
    position: "absolute",
    top: statusBarHeight + Theme.spacing.small,
    right: Theme.spacing.base,
    backgroundColor: "transparent",
    zIndex: 10000,
  },
  title: {
    position: "absolute",
    left: Theme.spacing.small,
    bottom: 50 + Theme.spacing.small,
  },
  outline: {
    color: "rgba(255, 255, 255, 0.8)",
  },
  name: {
    color: "white",
  },
});

export default Profile;
