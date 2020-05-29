import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, FlatList, TouchableOpacity, Image } from "react-native";
import Constants from "expo-constants";
import { Feather as Icon } from "@expo/vector-icons";
import Theme from "../Atoms/Theme";
import Text from "../Atoms/Text";
import Images from "../Atoms/Images";
import GoalItem from "../Molecules/GoalItem";
import BarChartSummary from "../Molecules/BarChartSummary";
import Header from "../Molecules/Header";
import TableGrid from "../Molecules/TableGrid";
import {
  goals_data_last_n_days_from_transformed_goals_array,
  goals_data_last_n_days_from_transformed_goals_array_chunked,
} from "../Atoms/BarChart.functions";
import BarChart from "../Atoms/BarChart";
import { AsyncStorage } from "react-native";
import { DataFlattenConvertGoals } from "../Atoms/BarChart.functions";
import DashboardTimeStamps from "../Molecules/DashboardTimeStamps";

import {
  LineChart,
  // BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

import { useGoalsPull } from "../../API";
const Dashboard = ({ navigation }) => {
  const logout = () => {
    AsyncStorage.setItem("token", "")
      .then(() => AsyncStorage.setItem("token_created_date", ""))
      .then(() => navigation.navigate("Login"));
  };
  const { goals, refetch } = useGoalsPull();
  const timeStamps = DataFlattenConvertGoals(goals);
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
  let data =goals_count_by_day_array.map(data => data.count)
  return (
    <View style={styles.container}>
      <Header title={"Dashboard"} sub_title={"Today"} logout={logout} />
      {/* <BarChart chartData={goals_count_by_day_array} /> */}
      <LineChart
      data={{
        labels: goals_count_by_day_array.map(data => data.date),
        datasets: [
          {
            data: goals_count_by_day_array.map(data => data.count)
          }
        ]
      }}
      width={Dimensions.get("window").width}
      height={256}
      verticalLabelRotation={30}
      chartConfig={{
        backgroundColor: "#000000",
        decimalPlaces: 0, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16
        },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "#ffa726"
        }
      }}
      bezier
    ></LineChart>

    {/* <StackedBarChart
      data={{
        labels:  goals_count_by_day_array.map(data => data.date),
        data: [[60, 60, 60], [30, 30, 60]],
        barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"]
      }}
      width={Dimensions.get("window").width}
      height={256}
      chartConfig={{
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#fb8c00",
        backgroundGradientTo: "#ffa726",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16
        },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "#ffa726"
        }
      }}
      showLegend={false}
    /> */}
    {/* {console.log(goals_count_by_day_array, goals, goals_count_by_day_array_chunked)} */}
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
