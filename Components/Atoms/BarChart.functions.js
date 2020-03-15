import React from "react";
import _ from "lodash";
import moment from "moment";

const DataFlattenConvertGoalItem = goal_item => {
  const time_stamps_list = goal_item["timeStamps"];
  const time_stamps_array = _.map(time_stamps_list, function(time_stamp_item) {
    return { ...goal_item, timeStamp: time_stamp_item };
  });
  return time_stamps_array;
};

const SublistsToFlattenedList = array => {
  return _.reduce(
    array,
    function(sublist_a, sublist_b) {
      const combined_list = sublist_a.concat(sublist_b);
      return combined_list;
    },
    [],
  );
};

const DataFlattenConvertGoals = array => {
  const time_stamp_array_grouped = _.map(array, DataFlattenConvertGoalItem);
  const time_stamp_array_flattened = SublistsToFlattenedList(time_stamp_array_grouped);
  return time_stamp_array_flattened;
};

const GroupByDay = (array, key_name) => {
  return _.groupBy(array, function(item) {
    return moment(item[key_name || "timeStamp"]).format("MM/DD/YY");
  });
};

const GroupByDayCountToArray = grouped_dict => {
  key_names = Object.keys(grouped_dict);
  return _.map(key_names, function(key_name) {
    var key_values = grouped_dict[key_name];
    return { date: key_name, count: key_values.length };
  });
};
const TransformToDayArrayCount = array => {
  const grouped_dict = GroupByDay(array, "timeStamp");
  const calculated_array = GroupByDayCountToArray(grouped_dict);
  return calculated_array;
};

export const GoalsDataTransformForBar = ({ goals }) => {
  const flattened_goals_array = DataFlattenConvertGoals(goals);
  const bar_graph_array = TransformToDayArrayCount(flattened_goals_array);
  return bar_graph_array;
  // const chartData = [
  //   { date: 1, count: 13000 },
  //   { date: 2, count: 16500 },
  //   { date: 3, count: 14250 },
  //   { date: 4, count: 19000 },
  // ];
  // return chartData;
};
