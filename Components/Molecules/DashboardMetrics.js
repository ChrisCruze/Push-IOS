import React, { useState, useEffect } from "react";
import MetricNeomorph from "../Atoms/MetricNeomorph";
import { StyleSheet, View } from "react-native";
import {
  determinePercentageDone,
  determineOverDue,
  filterTimeStampsForCadenceRelative,
} from "../Atoms/BarChart.functions";
import { CarouselMetrics } from "../Atoms/CarouselMetrics";
import {
  determineStreak,
  timeStampsFromGoals,
  daysAgoCalculate,
  numbersAvg,
} from "../Atoms/Calculations";
import _ from "lodash";
import moment from "moment";

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
    return determineOverDue({ ...D, goals });
  }).length;
  return <MetricNeomorph number={remaining_count} text={"Remaining"} />;
};
const CompleteGoals = ({ goals }) => {
  const count = goals.filter(function(D) {
    return !determineOverDue({ ...D, goals });
  }).length;
  const total_goals = goals.length;
  const fraction_number = `${count}/${total_goals}`;
  return <MetricNeomorph number={fraction_number} text={"Complete"} />;
};

const LongestStreak = ({ goals }) => {
  const streak_counts = _.map(goals, ({ timeStamps, cadence }) =>
    determineStreak({ timeStamps, cadence }),
  );
  const max_streak_count = _.max(streak_counts);
  return <MetricNeomorph number={max_streak_count} text={"Longest Streak"} />;
};

const OldestTask = ({ goals }) => {
  const timeStamps = timeStampsFromGoals({ goals });
  const oldestTimeStamp = _.min(timeStamps, function(timeStamp) {
    return moment(timeStamp).unix();
  });
  const days_oldest = daysAgoCalculate(oldestTimeStamp);
  return <MetricNeomorph number={days_oldest.toFixed(1)} text={"Oldest Goal"} />;
};

const AverageAge = ({ goals }) => {
  const timeStamps = timeStampsFromGoals({ goals });
  const days_ago_list = _.map(timeStamps, timeStamp => daysAgoCalculate(timeStamp));
  const days_avg = numbersAvg(days_ago_list);
  return <MetricNeomorph number={days_avg.toFixed(1)} text={"Avg Age"} />;
};

const PushesFromTimeRange = ({ timeStamps, time_interval, step }) => {
  const timeStampsList = _.map(timeStamps, timestampDict => {
    return timestampDict["timeStamp"];
  });
  const timeStampsFiltered = filterTimeStampsForCadenceRelative({
    timeStamps: timeStampsList,
    time_interval,
    step,
  });
  const count = timeStampsFiltered.length;
  return count;
};
const PushesToday = ({ timeStamps }) => {
  const count = PushesFromTimeRange({ timeStamps, time_interval: "day", step: 0 });
  return <MetricNeomorph number={count} text={"Today"} />;
};

const PushesYesterday = ({ timeStamps }) => {
  const count = PushesFromTimeRange({ timeStamps, time_interval: "day", step: 1 });
  return <MetricNeomorph number={count} text={"Yest."} />;
};

const PushesBeforeYesterday = ({ timeStamps }) => {
  const count = PushesFromTimeRange({ timeStamps, time_interval: "day", step: 2 });
  return <MetricNeomorph number={count} text={"Day Before"} />;
};

const PushesThisWeek = ({ timeStamps }) => {
  const count = PushesFromTimeRange({ timeStamps, time_interval: "week", step: 0 });
  return <MetricNeomorph number={count} text={"This Week"} />;
};

const PushesLastWeek = ({ timeStamps }) => {
  const count = PushesFromTimeRange({ timeStamps, time_interval: "week", step: 1 });
  return <MetricNeomorph number={count} text={"Last Week"} />;
};

const PushesLastWeekPrior = ({ timeStamps }) => {
  const count = PushesFromTimeRange({ timeStamps, time_interval: "week", step: 2 });
  return <MetricNeomorph number={count} text={"Week Before"} />;
};

const PushesThisMonth = ({ timeStamps }) => {
  const count = PushesFromTimeRange({ timeStamps, time_interval: "month", step: 0 });
  return <MetricNeomorph number={count} text={"This Month"} />;
};

const PushesLastMonth = ({ timeStamps }) => {
  const count = PushesFromTimeRange({ timeStamps, time_interval: "month", step: 1 });
  return <MetricNeomorph number={count} text={"Last Month"} />;
};

const PushesLastMonthPrior = ({ timeStamps }) => {
  const count = PushesFromTimeRange({ timeStamps, time_interval: "month", step: 2 });
  return <MetricNeomorph number={count} text={"Month Before"} />;
};

const DashboardMetrics = ({ goals, timeStamps }) => {
  return (
    <View style={styles.container}>
      <CarouselMetrics
        style="stats"
        itemsPerInterval={3}
        items={[
          <DueGoals goals={goals} />,
          <CompleteGoals goals={goals} />,
          <PercentageComplete goals={goals} />,
          <TotalPushes timeStamps={timeStamps} />,
          <LongestStreak goals={goals} />,
          <OldestTask goals={goals} />,
          <PushesToday timeStamps={timeStamps} />,
          <PushesYesterday timeStamps={timeStamps} />,
          <PushesBeforeYesterday timeStamps={timeStamps} />,
          <PushesThisWeek timeStamps={timeStamps} />,
          <PushesLastWeek timeStamps={timeStamps} />,
          <PushesLastWeekPrior timeStamps={timeStamps} />,
          <PushesThisMonth timeStamps={timeStamps} />,
          <PushesLastMonth timeStamps={timeStamps} />,
          <PushesLastMonthPrior timeStamps={timeStamps} />,
          <AverageAge goals={goals} />,
          <TotalGoals goals={goals} />,
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
