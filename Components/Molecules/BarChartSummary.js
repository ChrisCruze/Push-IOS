import React, { useState } from "react";
import BarChart from "../Atoms/BarChart";
import { GoalsDataTransformForBar } from "../Atoms/BarChart.functions";
const BarChartSummary = ({ goals }) => {
  const chartData = GoalsDataTransformForBar({ goals });
  // const chartData = [
  //   { date: 1, count: 13000 },
  //   { date: 2, count: 16500 },
  //   { date: 3, count: 14250 },
  //   { date: 4, count: 19000 },
  // ];
  return <BarChart chartData={chartData} />;
};
export default BarChartSummary;
