import React, { useState, useEffect, Fragment } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import Constants from "expo-constants";
import Theme from "../Atoms/Theme";
import { goals_data_last_n_days_from_transformed_goals_array } from "../Atoms/BarChart.functions";
import BarChart from "../Atoms/BarChart";

import ProgressCircle from "react-native-progress-circle";
import { Dropdown } from "react-native-material-dropdown";
import { determinePercentageDone } from "../Atoms/BarChart.functions";

import {
  LineChart,
  // BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

const DashboardCharts = ({ goals }) => {
  let dropdownData = [
    {
      value: "Pie Chart",
    },
    {
      value: "Line Chart",
    },
  ];

  const [selectedValue, setSelectedValue] = useState("");
  const goals_count_by_day_array = goals_data_last_n_days_from_transformed_goals_array({
    goals,
    number_of_days: 7,
  });

  const percentage_complete = determinePercentageDone(goals);
  return (
    <Fragment>
      {selectedValue === "Pie Chart" ? (
        <ProgressCircle
          percent={percentage_complete}
          width={Dimensions.get("window").width}
          radius={100}
          borderWidth={20}
          color="#3399FF"
          shadowColor="#999"
          bgColor="#fff"
          alignSelf="center"
        >
          <Text style={{ fontSize: 24 }}>{percentage_complete + "% of tasks completed"}</Text>
        </ProgressCircle>
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

      <Dropdown
        label="Chart Type"
        data={dropdownData}
        value={selectedValue}
        onChangeText={setSelectedValue}
      />
    </Fragment>
  );
};

export default DashboardCharts;
