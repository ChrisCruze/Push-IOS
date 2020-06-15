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
import ProgressCircle from "react-native-progress-circle";
import { Dropdown } from "react-native-material-dropdown";

import {
  LineChart,
  // BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

import NetworkCheckNav from "../Molecules/NetworkCheckNav";

import { useGoalsPull } from "../../API";

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
  let data = goals_count_by_day_array.map(data => data.count);
  return (
    <View style={styles.container}>
      <Header title={"Dashboard"} sub_title={"Today"} logout={logout} logout_text={"Logout"} />
      {selectedValue === "Bar Chart" ? (
        <BarChart chartData={goals_count_by_day_array} />
      ) : (
        <LineChart
          data={{
            labels: goals_count_by_day_array.map(data => data.date),
            datasets: [
              {
                data: goals_count_by_day_array.map(data => data.count),
              },
            ],
          }}
          width={Dimensions.get("window").width}
          height={256}
          verticalLabelRotation={30}
          chartConfig={{
            backgroundColor: "#FFFFFF",
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#FFFFFF",
            },
          }}
          bezier
        ></LineChart>
      )}

      {/* <ProgressCircle
            percent={30}
            radius={100}
            borderWidth={20}
            color="#3399FF"
            shadowColor="#999"
            bgColor="#fff"
            alignSelf="center"
        >
            <Text style={{ fontSize: 24 }}>{'30%'}</Text>
        </ProgressCircle> */}
      <Dropdown
        label="Chart Type"
        data={dropdownData}
        value={selectedValue}
        onChangeText={setSelectedValue}
      />
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
