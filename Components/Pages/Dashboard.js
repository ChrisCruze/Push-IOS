import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import Constants from "expo-constants";
import Theme from "../Atoms/Theme";
import TableGrid from "../Molecules/TableGrid";
import {
  goals_data_last_n_days_from_transformed_goals_array,
  goals_data_last_n_days_from_transformed_goals_array_chunked,
} from "../Atoms/BarChart.functions";
import BarChart from "../Atoms/BarChart";
import { AsyncStorage } from "react-native";
import { DataFlattenConvertGoals } from "../Atoms/BarChart.functions";
import DashboardTimeStamps from "../Molecules/DashboardTimeStamps";
import ProgressCircle from "react-native-progress-circle";
import { Dropdown } from "react-native-material-dropdown";
import DashboardHeader from "../Molecules/DashboardHeader";
import { GoalsSort, GoalsFilterState, GoalsFilterCadence } from "../Atoms/BarChart.functions";
import DashboardCharts from "../Molecules/DashboardCharts";
import Container from "../Atoms/Container";

import {
  LineChart,
  // BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

import NetworkCheckNav from "../Molecules/NetworkCheckNav";
import { Content } from "native-base";

import { useGoalsPull } from "../../API";

const GoalsFilter = ({ goals }) => {
  const [filter, updateFilter] = useState({ state: "all", cadence: "all" });
  const filtered_state_goals = GoalsFilterState({ goals, state: filter.state });
  const filtered_cadence_goals = GoalsFilterCadence({
    goals: filtered_state_goals,
    cadence: filter.cadence,
  });
  return { filtered_goals: filtered_cadence_goals, updateFilter, filter };
};

const Dashboard = ({ navigation }) => {
  let dropdownData = [
    {
      value: "Bar Chart",
    },
    {
      value: "Line Chart",
    },
  ];

  const [selectedValue, setSelectedValue] = useState("");

  const logout = () => {
    AsyncStorage.setItem("token", "")
      .then(() => AsyncStorage.setItem("token_created_date", ""))
      .then(() => navigation.navigate("Login"));
  };
  const { goals, refetch, networkStatus } = useGoalsPull();

  NetworkCheckNav({ networkStatus, navigation });

  const { filtered_goals, updateFilter, filter } = GoalsFilter({ goals });

  const timeStamps = DataFlattenConvertGoals(filtered_goals);
  useEffect(() => {
    refetch();
  }, []);
  const goals_count_by_day_array = goals_data_last_n_days_from_transformed_goals_array({
    goals,
    number_of_days: 7,
  });

  const goals_count_by_day_array_chunked = goals_data_last_n_days_from_transformed_goals_array_chunked(
    {
      goals,
      number_of_days: 28,
      chunk_size: 7,
    },
  );
  return (
    <View style={styles.container}>
      <DashboardHeader
        title={"Dashboard"}
        logout={logout}
        updateFilter={updateFilter}
        filter={filter}
        navigation={navigation}
      />
      <DashboardCharts goals={filtered_goals} />
      <TableGrid list_of_lists={goals_count_by_day_array_chunked} />
      <DashboardTimeStamps timeStamps={timeStamps} navigation={navigation} />
    </View>
  );
};

const avatarSize = 100;
const { width } = Dimensions.get("window");
const { statusBarHeight } = Constants;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.palette.background,
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
