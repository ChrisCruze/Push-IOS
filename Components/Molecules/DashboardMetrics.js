import React from "react";
import MetricNeomorph from "../Atoms/MetricNeomorph";
import { StyleSheet, View } from "react-native";
import { determinePercentageDone, determineOverDue } from "../Atoms/BarChart.functions";
import { CarouselMetrics } from "../Atoms/CarouselMetrics";

const DashboardMetrics = ({ goals, timeStamps }) => {
  return (
    <View style={styles.container}>
      <CarouselMetrics
        style="stats"
        itemsPerInterval={3}
        items={[
          {
            label: "Pushes",
            value: timeStamps.length,
          },
          {
            label: "Goals",
            value: goals.length,
          },
          {
            label: "Complete",
            value:
              (determinePercentageDone(goals) === "NaN" ? 0 : determinePercentageDone(goals)) + "%",
          },
          {
            label: "Remaining",
            value: goals.filter(function(D) {
              return determineOverDue({ ...D, goals: goals });
            }).length,
          },
          {
            label: "Remaining %",
            value:
              (determinePercentageDone(goals) === "NaN" ? 0 : 1 - determinePercentageDone(goals)) +
              "%",
          },
          {
            label: "LAST MONTH",
            value: 175,
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
