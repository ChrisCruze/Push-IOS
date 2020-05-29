import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Linking,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import Constants from "expo-constants";
import TableGrid from "../Molecules/TableGrid";
import GoalPageButtons from "../Molecules/GoalPageButtons";

import Header from "../Molecules/Header";
import {
  goals_data_last_n_days_from_transformed_goals_array,
  goals_data_last_n_days_from_transformed_goals_array_chunked,
} from "../Atoms/BarChart.functions";
import BarChart from "../Atoms/BarChart";
import { useGoalsPull, useGoalUpdate, useGoalDelete } from "../../API";
import GoalTimeStamps from "../Molecules/GoalTimeStamps";
import Theme from "../Atoms/Theme";
const GoalBarChart = ({ goals_filtered }) => {
  const goals_count_by_day_array = goals_data_last_n_days_from_transformed_goals_array({
    goals: goals_filtered,
    number_of_days: 7,
  });
  return <BarChart chartData={goals_count_by_day_array} />;
};

const GoalTableGrid = ({ goals_filtered }) => {
  const goals_count_by_day_array_chunked = goals_data_last_n_days_from_transformed_goals_array_chunked(
    {
      goals: goals_filtered,
      number_of_days: 28,
      chunk_size: 7,
    },
  );
  return <TableGrid list_of_lists={goals_count_by_day_array_chunked} />;
};

const GoalHeader = ({ goals_filtered, back }) => {
  const goals_dict = goals_filtered[0];
  return (
    <Header title={goals_dict.title || "-"} sub_title={" "} logout={back} logout_text={"Back"} />
  );
};

const Goal = ({ navigation }) => {
  const back = () => navigation.navigate("Goals");
  const _id = navigation.getParam("id");
  const { goals, refetch } = useGoalsPull();
  useEffect(() => {
    refetch();
  }, []);
  const goals_filtered = goals.filter(function(D) {
    return D["_id"] == _id;
  });

  return (
    <View style={styles.container}>
      <GoalHeader goals_filtered={goals_filtered} back={back} />
      <GoalBarChart goals_filtered={goals_filtered} />
      <GoalTableGrid goals_filtered={goals_filtered} />
      <GoalPageButtons {...goals_filtered[0]} _id={_id} navigation={navigation} refetch={refetch} />
      <GoalTimeStamps {...goals_filtered[0]} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.palette.background, 
  },
});

export default Goal;
