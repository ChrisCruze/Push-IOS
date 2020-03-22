import * as React from "react";
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

import APIStore from "../Atoms/APIStore";
// import DashboardGoal from "../Organisms/DashboardGoal";
import BarChartSummary from "../Molecules/BarChartSummary";
import TableGrid from "../Molecules/TableGrid";
import Header from "../Molecules/Header";

const Goal = ({ navigation }) => {
  const back = () => navigation.navigate("Goals");

  const id = navigation.getParam("id");
  const goals = APIStore.goals();
  //use the filtered
  const goals_filtered = goals.filter(function(D) {
    return D["id"] == id;
  });
  const goals_dict = goals_filtered[0];
  const list_of_lists = [
    ["a", "b", "c", "d", "e", "f"],
    ["a", "b", "c", "d", "e", "f"],
    ["a", "b", "c", "d", "e", "f"],
    ["a", "b", "c", "d", "e", "f"],
    ["a", "b", "c", "d", "e", "f"],
  ];
  return (
    <View style={styles.container}>
      <Header
        title={goals_dict.title || "-"}
        sub_title={String(goals_dict.totalCount) || "0"}
        logout={back}
      />
      <BarChartSummary goals={goals} />
      <TableGrid list_of_lists={list_of_lists} />
    </View>
  );
};
const { statusBarHeight } = Constants;
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Goal;
