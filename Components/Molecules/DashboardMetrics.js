import React, { Fragment } from "react";
import MetricNeomorph from "../Atoms/MetricNeomorph";
import { StyleSheet, View } from "react-native";
import { determinePercentageDone } from "../Atoms/BarChart.functions";

const TotalPushes = ({ timeStamps }) => {
  const total_pushes_count = timeStamps.length;
  return <MetricNeomorph number={total_pushes_count} text={"Total Pushes"} />;
};

const TotalGoals = ({ goals }) => {
  const count = goals.length;
  return <MetricNeomorph number={count} text={"Total Goals"} />;
};

const PercentageComplete = ({ goals }) => {
  const percentage_complete = determinePercentageDone(goals);
  return <MetricNeomorph number={percentage_complete + "%"} text={"Complete"} />;
};

const DashboardMetrics = ({ goals, timeStamps }) => {
  return (
    <View style={styles.container}>
      <PercentageComplete goals={goals} />
      <TotalGoals goals={goals} />
      <TotalPushes timeStamps={timeStamps} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
});
export default DashboardMetrics;
