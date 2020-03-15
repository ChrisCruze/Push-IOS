import React, { useState } from "react";
import { View, StyleSheet, Dimensions, FlatList, TouchableOpacity, Image } from "react-native";
import Constants from "expo-constants";
import { Feather as Icon } from "@expo/vector-icons";
import Text from "../Atoms/Text";
import Images from "../Atoms/Images";
import Theme from "../Atoms/Theme";
import BarChartSummary from "../Molecules/BarChartSummary";

const DashboardGoal = ({ back, goals }) => {
  return <BarChartSummary goals={goals} />;
};

export default DashboardGoal;
