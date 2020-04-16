import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import Constants from "expo-constants";
import { Feather as Icon } from "@expo/vector-icons";
import Theme from "../Atoms/Theme";
import Text from "../Atoms/Text";
import Images from "../Atoms/Images";
import FirstPost from "../Atoms/FirstPost";
import GoalItem from "../Molecules/GoalItem";
import Header from "../Molecules/Header";
import moment from "moment";
import { useGoalsPull, useGoalUpdate, useGoalDelete } from "../../API";

const Goals = ({ navigation }) => {
  const logout = () => navigation.navigate("Login");

  const { goals, refetch } = useGoalsPull();
  const { updateGoal } = useGoalUpdate();
  const { removeGoal } = useGoalDelete();
  refetch();

  const createNewGoal = () => {
    navigation.navigate("createGoal");
  };

  return (
    <View style={styles.container}>
      <Header title={"Goals"} sub_title={"List"} logout={logout} />
      <FlatList
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={styles.list}
        data={goals}
        keyExtractor={goal => goal.id}
        renderItem={({ item }) => {
          return GoalItem({
            ...item,
            navigation,
            goals,
            updateGoal,
            removeGoal,
            refetch,
          });
        }}
        ListHeaderComponent={
          <View style={styles.post}>
            <TouchableWithoutFeedback onPress={createNewGoal}>
              <Icon name="plus-circle" color={Theme.palette.primary} size={25} />
            </TouchableWithoutFeedback>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.post}>
            <TouchableWithoutFeedback onPress={createNewGoal}>
              <Icon name="plus-circle" color={Theme.palette.primary} size={25} />
            </TouchableWithoutFeedback>
          </View>
        }
      />
    </View>
  );
};

const avatarSize = 100;
const { width } = Dimensions.get("window");
const { statusBarHeight } = Constants;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  post: {
    paddingHorizontal: Theme.spacing.small,
  },
  header: {
    marginBottom: Theme.spacing.small,
    height: statusBarHeight * 2,
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

export default Goals;
