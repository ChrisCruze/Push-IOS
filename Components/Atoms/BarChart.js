import React from "react";
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis } from "victory-native";

const BarChart = ({ chartData, x, y }) => {
  return (
    <VictoryChart theme={VictoryTheme.grayscale} domainPadding={{ x: 20 }}>
      <VictoryBar
        data={chartData}
        labels={({ datum }) => datum.count}
        x={x || "date"}
        y={y || "count"}
        style={{
          data: { fill: "#006bb6" },
        }}
      />
      <VictoryAxis />
    </VictoryChart>
  );
};
export default BarChart;
