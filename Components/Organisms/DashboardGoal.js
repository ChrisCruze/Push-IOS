import React, { useState, Fragment } from "react";
import { View, StyleSheet, Dimensions, FlatList, TouchableOpacity, Image } from "react-native";
import Constants from "expo-constants";
import { Feather as Icon } from "@expo/vector-icons";
import Text from "../Atoms/Text";
import Images from "../Atoms/Images";
import Theme from "../Atoms/Theme";
import BarChartSummary from "../Molecules/BarChartSummary";
import TableGrid from "../Molecules/TableGrid";

const DashboardGoal = ({ back, goals }) => {
  const list_of_lists = [["a", "b", "c"], ["1", "2", "3"], ["1", "2", "3"]];
  return (
    <Fragment>
      <BarChartSummary goals={goals} />
      <TableGrid list_of_lists={list_of_lists} />
    </Fragment>
  );
};

export default DashboardGoal;
