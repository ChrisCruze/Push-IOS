import React from "react";
import MetricNeomorph from "../Atoms/MetricNeomorph";
import { StyleSheet, View } from "react-native";
import { determinePercentageDone, determineOverDue } from "../Atoms/BarChart.functions";
import { CarouselMetrics } from "../Atoms/CarouselMetrics";
import { determineStreak } from "../Atoms/Calculations";

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
  return (
    <MetricNeomorph
      number={(percentage_complete === "NaN" ? 0 : percentage_complete) + "%"}
      text={"Complete"}
    />
  );
};

const DueGoals = ({ goals }) => {
  const remaining_count = goals.filter(function(D) {
    return determineOverDue({ ...D, goals: array });
  }).length;
  return <MetricNeomorph number={remaining_count} text={"Due Goals"} />;
};

const LongestStreak = ({ goals }) => {
  const streak_counts = _.map(goals, ({ timeStamps, cadence }) =>
    determineStreak({ timeStamps, cadence }),
  );
  const max_streak_count = _.max(streak_counts);

  return <MetricNeomorph number={max_streak_count} text={"Longest Streak"} />;
};

const DashboardMetrics = ({ goals, timeStamps }) => {
  return (
    <View style={styles.container}>
      <CarouselMetrics
        style="stats"
        itemsPerInterval={3}
        items={[
          <PercentageComplete goals={goals} />,
          <TotalGoals goals={goals} />,
          <TotalPushes timeStamps={timeStamps} />,
          <DueGoals goals={goals} />,
          <LongestStreak goals={LongestStreak} />,
          <TotalPushes timeStamps={timeStamps} />,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    textAlign: "center",
  },
});
export default DashboardMetrics;
