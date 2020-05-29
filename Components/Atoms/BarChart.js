import React from "react";
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis } from "victory-native";

const BarChart = ({ chartData, x, y }) => {
  // const chartData = [
  //   { date: 1, count: 13000 },
  //   { date: 2, count: 16500 },
  //   { date: 3, count: 14250 },
  //   { date: 4, count: 19000 },
  // ];
  return (
    <VictoryChart theme={VictoryTheme.grayscale} domainPadding={{ x: 20 }}>
      <VictoryBar
        data={chartData}
        labels={({ datum }) => datum.count}
        x={x || "date"}
        y={y || "count"}
        style={{
          data: { fill: "black" },
        }}
      />
      <VictoryAxis />
    </VictoryChart>
  );
};
export default BarChart;
