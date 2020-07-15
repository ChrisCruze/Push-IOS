import React from "react";
import MetricNeomorph from "../Atoms/MetricNeomorph";
import { StyleSheet, View } from "react-native";
import { determinePercentageDone, determineOverDue } from "../Atoms/BarChart.functions";
import { CarouselMetrics } from "../Atoms/CarouselMetrics";

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

const DashboardMetrics = ({ goals, timeStamps }) => {
  return (
    <View style={styles.container}>
      <CarouselMetrics
        style="stats"
        itemsPerInterval={3}
        items={[
          {
            elem: <PercentageComplete goals={goals} />,
          },
          {
            elem: <TotalGoals goals={goals} />,
          },
          {
            elem: <TotalPushes timeStamps={timeStamps} />,
          },
          {
            elem: <PercentageComplete goals={goals} />,
          },
          {
            elem: <PercentageComplete goals={goals} />,
          },
          {
            elem: <PercentageComplete goals={goals} />,
          },
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
