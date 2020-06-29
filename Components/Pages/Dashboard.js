import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Animated } from "react-native";
import Constants from "expo-constants";
import Theme from "../Atoms/Theme";
import TableGrid from "../Molecules/TableGrid";
import { goals_data_last_n_days_from_transformed_goals_array_chunked } from "../Atoms/BarChart.functions";
import { AsyncStorage } from "react-native";
import { DataFlattenConvertGoals } from "../Atoms/BarChart.functions";
import DashboardTimeStamps from "../Molecules/DashboardTimeStamps";
import DashboardHeader from "../Molecules/DashboardHeader";
import { GoalsFilterState, GoalsFilterCadence } from "../Atoms/BarChart.functions";
import DashboardCharts from "../Molecules/DashboardCharts";
import DashboardMetrics from "../Molecules/DashboardMetrics";
import NetworkCheckNav from "../Molecules/NetworkCheckNav";
import { useGoalsPull } from "../../API";
import { NavigationEvents } from "react-navigation";

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
  const [scrollAnimation] = useState(new Animated.Value(0));

  const logout = () => {
    AsyncStorage.setItem("token", "")
      .then(() => AsyncStorage.setItem("token_created_date", ""))
      .then(() => navigation.navigate("Login"));
  };
  const { goals, refetch, networkStatus } = useGoalsPull();
  const { filtered_goals, updateFilter, filter } = GoalsFilter({ goals });

  NetworkCheckNav({ networkStatus, navigation });

  const timeStamps = DataFlattenConvertGoals(filtered_goals);
  useEffect(() => {
    refetch();
  }, []);

  const goals_count_by_day_array_chunked = goals_data_last_n_days_from_transformed_goals_array_chunked(
    {
      goals,
      number_of_days: 28,
      chunk_size: 7,
    },
  );
  return (
    <View style={styles.container}>
      <NavigationEvents
        onWillFocus={() => {
          refetch();
        }}
      />
      <DashboardHeader
        title={"Dashboard"}
        logout={logout}
        updateFilter={updateFilter}
        filter={filter}
        navigation={navigation}
      />
      <Animated.ScrollView
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { y: scrollAnimation } },
            },
          ],
          {
            useNativeDriver: true,
          },
        )}
      >
        <DashboardCharts goals={filtered_goals} />
        <TableGrid list_of_lists={goals_count_by_day_array_chunked} />
        <DashboardMetrics goals={filtered_goals} timeStamps={timeStamps} />
        <DashboardTimeStamps timeStamps={timeStamps} navigation={navigation} />
      </Animated.ScrollView>
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
