import React, { useState, useEffect } from "react";
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

export const DataFlattenConvertGoals = array => {
  const time_stamp_array_grouped = _.map(array, DataFlattenConvertGoalItem);
  const time_stamp_array_flattened = SublistsToFlattenedList(time_stamp_array_grouped);
  return time_stamp_array_flattened;
};

const GroupByDay = (array, key_name) => {
  return _.groupBy(array, function(item) {
    return moment(item[key_name || "timeStamp"]).format("YYYY-MM-DD");
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

export const dates_array_create_from_start = ({ number_of_days, start_date }) => {
  var start = start_date || moment();
  var dates_list = [];
  for (i = 0; i < number_of_days; i++) {
    var next_time = start.clone();
    next_time.subtract(i, "day");
    dates_list.push(next_time);
  }
  return dates_list;
};

export const dates_array_create_from_start_grouped = ({
  number_of_days,
  start_date,
  chunk_size,
}) => {
  const dates_array = dates_array_create_from_start({ number_of_days, start_date });
  return _.chunk(dates_array, chunk_size || 7);
};

export const GoalsDataTransformForBar = ({ goals }) => {
  const flattened_goals_array = DataFlattenConvertGoals(goals);
  const transformed_date_array = TransformToDayArrayCount(flattened_goals_array);
  return transformed_date_array;
  // const chartData = [
  //   { date: 1, count: 13000 },
  //   { date: 2, count: 16500 },
  //   { date: 3, count: 14250 },
  //   { date: 4, count: 19000 },
  // ];
  // return chartData;
};

const goals_data_combine_with_date = ({ moment_date, flattened_goals_array }) => {
  const moment_date_formatted = moment_date.format("MM/DD");
  const goals_array_for_date = flattened_goals_array.filter(function(D) {
    const goal_time_stamp_format = moment(D["timeStamp"]).format("MM/DD");
    return goal_time_stamp_format == moment_date_formatted;
  });
  const goals_length = goals_array_for_date.length;

  return { date: moment_date_formatted, count: goals_length };
};
export const goals_data_last_n_days_from_transformed_goals_array = ({ goals, number_of_days }) => {
  const flattened_goals_array = DataFlattenConvertGoals(goals);
  const last_fourteen_days = dates_array_create_from_start({
    number_of_days: number_of_days || 7,
  });
  const last_fourteen_days_with_goals_count = _.map(last_fourteen_days, function(moment_date) {
    return goals_data_combine_with_date({ moment_date, flattened_goals_array });
  });
  last_fourteen_days_with_goals_count.reverse();
  return last_fourteen_days_with_goals_count;
};

const background_color_attribute_add_based_on_count = array => {
  return _.map(array, D => {
    return {
      ...D,
      color: D.count == 0 ? "black" : "white",
      backgroundColor: D.count == 0 ? "#ebedf0" : "black",
    };
  });
};
export const goals_data_last_n_days_from_transformed_goals_array_chunked = ({
  goals,
  number_of_days,
  chunk_size,
}) => {
  const last_fourteen_days_with_goals_count = goals_data_last_n_days_from_transformed_goals_array({
    goals,
    number_of_days,
  });
  const last_fourteen_days_with_goals_count_with_color = background_color_attribute_add_based_on_count(
    last_fourteen_days_with_goals_count,
  );
  return _.chunk(last_fourteen_days_with_goals_count_with_color, chunk_size || 7);
};

const getGoalTimeStamps = ({ goals, id }) => {
  const goals_filtered =
    goals.find(function(D) {
      return D["id"] == id;
    })["timeStamps"] || [];

  return goals_filtered;
};

const getStartEndDateTime = time_interval => {
  const end = moment().endOf(time_interval);
  const start = moment().startOf(time_interval);
  return { start, end };
};
const determineStartEndDateRange = cadence => {
  const is_daily = String(cadence).toLowerCase() == "daily";
  const is_weekly = String(cadence).toLowerCase() == "weekly";
  const is_monthly = String(cadence).toLowerCase() == "monthly";
  if (is_weekly) {
    return getStartEndDateTime("week");
  } else if (is_monthly) {
    return getStartEndDateTime("month");
  } else {
    return getStartEndDateTime("day");
  }
};

export const filterTimeStampsForCadenceFromStartEnd = ({ timeStamps, start, end }) => {
  const filteredTimeStamps = timeStamps.filter(function(timeStamp) {
    const is_after_start = moment(timeStamp).isAfter(start);
    const is_before_end = moment(timeStamp).isBefore(end);
    return is_after_start && is_before_end;
  });
  return filteredTimeStamps;
};
export const filterTimeStampsForCadence = ({ timeStamps, cadence }) => {
  const { start, end } = determineStartEndDateRange(cadence);
  const filteredTimeStamps = filterTimeStampsForCadenceFromStartEnd({ timeStamps, start, end });
  return filteredTimeStamps;
};

const percentageTimeFrameComplete = ({ start, end }) => {
  const minutes_difference_from_start = moment().diff(start, "minutes");
  const minutes_total = end.diff(start, "minutes");
  const percentage_complete = minutes_difference_from_start / minutes_total;
  return percentage_complete;
};

//if goal is 7 times a week, and its monday, and you only completed once, it will show overdue, since you should have been at 2 by Monday
const determineOverDueFromTimeStamps = ({ cadence, cadenceCount, timeStamps }) => {
  const { start, end } = determineStartEndDateRange(cadence);
  const filteredTimeStamps = filterTimeStampsForCadenceFromStartEnd({ timeStamps, start, end });
  const percentageTimePassed = percentageTimeFrameComplete({ start, end });
  const cadenceInt = cadenceCount == 0 ? 1 : cadenceCount;
  const goalCountTresholdForCadence = percentageTimePassed * cadenceInt;
  const is_overdue = goalCountTresholdForCadence > filteredTimeStamps.length;
  return is_overdue;
};

export const determineOverDue = ({ cadence, cadenceCount, goals, id }) => {
  const timeStamps = getGoalTimeStamps({ goals, id });
  return determineOverDueFromTimeStamps({ cadence, cadenceCount, timeStamps });
};

const sortByOverDue = goals => {
  const sortedGoals = _.sortBy(goals, goal =>
    determineOverDueFromTimeStamps({ ...goal }) ? 0 : 1,
  );
  return sortedGoals;
};

export const GoalsSort = ({ goals }) => {
  const [sortOrder, updateSortOrder] = useState("none");
  const goals_copy = [...goals];

  if (sortOrder == "none") {
    var sorted_goals = sortByOverDue(goals_copy);
    return { sorted_goals, updateSortOrder, sortOrder };
  } else if (sortOrder == "asc") {
    var sorted_goals = _.sortBy(goals_copy, function(D) {
      return D["title"];
    });
    return { sorted_goals, updateSortOrder, sortOrder };
  } else {
    var sorted_goals = _.sortBy(goals_copy, function(D) {
      return D["title"];
    });
    sorted_goals.reverse();
    return { sorted_goals, updateSortOrder, sortOrder };
  }
};

export const GoalsFilterState = ({ goals, state }) => {
  if (state == "all") {
    return goals;
  } else if (state == "incomplete") {
    var filtered_goals = goals.filter(function(D) {
      return determineOverDue({ ...D, goals });
    });
    return filtered_goals;
  } else if (state == "complete") {
    var filtered_goals = goals.filter(function(D) {
      return !determineOverDue({ ...D, goals });
    });
    return filtered_goals;
  }
};

export const GoalsFilterCadence = ({ goals, cadence }) => {
  if (cadence == "all") {
    return goals;
  } else {
    var filtered_goals = goals.filter(function(D) {
      return String(D["cadence"]).toLowerCase() == cadence;
    });
    return filtered_goals;
  }
};

export const determinePercentageDone = array => {
  const number_of_goals = array.length;
  const completed_count = array.filter(function(D) {
    return !determineOverDue({ ...D, goals: array });
  }).length;
  const remaining_count = array.filter(function(D) {
    return determineOverDue({ ...D, goals: array });
  }).length;
  const complete_percentage = ((completed_count / number_of_goals) * 100).toFixed(0);
  return complete_percentage;
};
