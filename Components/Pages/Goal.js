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

// import DashboardGoal from "../Organisms/DashboardGoal";
import TableGrid from "../Molecules/TableGrid";
import Header from "../Molecules/Header";
import {
  goals_data_last_n_days_from_transformed_goals_array,
  goals_data_last_n_days_from_transformed_goals_array_chunked,
} from "../Atoms/BarChart.functions";
import BarChart from "../Atoms/BarChart";
import { useGoalsPull, useGoalUpdate, useGoalDelete } from "../../API";

const Goal = ({ navigation }) => {
  const back = () => navigation.navigate("Goals");
  const _id = navigation.getParam("id");
  const { goals, refetch } = useGoalsPull();
  refetch();

  //use the filtered
  const goals_filtered = goals.filter(function(D) {
    return D["_id"] == _id;
  });

  const goals_count_by_day_array = goals_data_last_n_days_from_transformed_goals_array({
    goals: goals_filtered,
    number_of_days: 7,
  });

  const goals_count_by_day_array_chunked = goals_data_last_n_days_from_transformed_goals_array_chunked(
    {
      goals: goals_filtered,
      number_of_days: 28,
      chunk_size: 7,
    },
  );
  const goals_dict = goals_filtered[0];
  return (
    <View style={styles.container}>
      <Header
        title={goals_dict.title || "-"}
        sub_title={String(goals_dict.totalCount) || "0"}
        logout={back}
        logout_text={"Back"}
      />
      <BarChart chartData={goals_count_by_day_array} />

      <TableGrid list_of_lists={goals_count_by_day_array_chunked} />
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
