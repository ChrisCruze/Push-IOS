import React, { useState } from "react";
import { View, StyleSheet, Dimensions, FlatList, TouchableOpacity, Image } from "react-native";
import Constants from "expo-constants";
import { Feather as Icon } from "@expo/vector-icons";
import Text from "../Atoms/Text";
import Images from "../Atoms/Images";
import Theme from "../Atoms/Theme";
import BarChartSummary from "../Molecules/BarChartSummary";
const DashboardSummary = ({ profile, logout, goals }) => {
  return (
    <View style={[styles.header]}>
      <TouchableOpacity onPress={logout} style={styles.settings}>
        <View>
          <Icon name="log-out" size={25} color="blue" />
        </View>
      </TouchableOpacity>
      <View style={[styles.chart]}>
        <BarChartSummary goals={goals} />
      </View>
    </View>
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
  chart: {
    position: "absolute",
    left: Theme.spacing.small,
    bottom: Theme.spacing.small,
  },
  outline: {
    color: "rgba(255, 255, 255, 0.8)",
  },
  name: {
    color: "white",
  },
});

export default DashboardSummary;
