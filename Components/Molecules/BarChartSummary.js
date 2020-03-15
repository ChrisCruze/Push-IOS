import React, { useState } from "react";
import BarChart from "../Atoms/BarChart";
import { GoalsDataTransformForBar } from "../Atoms/BarChart.functions";
const BarChartSummary = ({ goals }) => {
  const chartData = GoalsDataTransformForBar({ goals });
  return <BarChart chartData={chartData} />;
};
export default BarChartSummary;
