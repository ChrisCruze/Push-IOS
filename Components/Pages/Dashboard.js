import React, { useState } from "react";
import { View, StyleSheet, Dimensions, FlatList, TouchableOpacity, Image } from "react-native";
import Constants from "expo-constants";
import { Feather as Icon } from "@expo/vector-icons";
import APIStore from "../Atoms/APIStore";
import Theme from "../Atoms/Theme";
import Text from "../Atoms/Text";
import Images from "../Atoms/Images";
import GoalItem from "../Molecules/GoalItem";
import BarChartSummary from "../Molecules/BarChartSummary";
import Header from "../Molecules/Header";
import TableGrid from "../Molecules/TableGrid";

const Dashboard = ({ navigation }) => {
  const logout = () => navigation.navigate("Login");

  const uid = APIStore.me();
  const goals = APIStore.goals();
  const profile = APIStore.profile(uid);
  const list_of_lists = [
    ["a", "b", "c", "d"],
    ["1", "2", "3"],
    ["1", "2", "3"],
    ["1", "2", "3"],
    ["1", "2", "3"],
  ];
  return (
    <View style={styles.container}>
      <Header title={"Dashboard"} sub_title={"Today"} />
      <BarChartSummary goals={goals} />
      <TableGrid list_of_lists={list_of_lists} />
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

export default Dashboard;
