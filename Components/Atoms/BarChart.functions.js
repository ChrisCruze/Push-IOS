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
    return { ...D, color: D.count == 0 ? "black" : "white", backgroundColor: D.count == 0 ? "#ebedf0" : "black" };
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

function determine_number_of_days_from_now(latest_time_stamp) {
  const difference_hours = moment().diff(moment(latest_time_stamp), "hours");
  return difference_hours / 24;
}

function determine_how_long_ago_acceptable({ cadenceCount, cadence }) {
  const is_daily = String(cadence).toLowerCase() == "daily";
  const is_weekly = String(cadence).toLowerCase() == "weekly";
  const is_monthly = String(cadence).toLowerCase() == "monthly";

  const numerator = is_daily ? 1 : is_weekly ? 7 : is_monthly ? 30 : 0;
  const cadenceInt = cadenceCount == 0 ? 1 : cadenceCount;
  const calculated_days_away_acceptable = numerator / cadenceInt;
  return calculated_days_away_acceptable;
}

const GoalLastTimeStamp = ({ goals, id }) => {
  const goals_filtered =
    goals.find(function(D) {
      return D["id"] == id;
    })["timeStamps"] || [];
  const lastTimeStamp = _.max(goals_filtered, function(timeStamp) {
    return moment(timeStamp).unix();
  });
  return lastTimeStamp;
};

export const determineOverDue = ({ cadence, cadenceCount, goals, id }) => {
  const lastTimeStamp = GoalLastTimeStamp({ goals, id });
  const calculated_days_away_acceptable = determine_how_long_ago_acceptable({
    cadenceCount,
    cadence,
  });
  const days_away = determine_number_of_days_from_now(lastTimeStamp);
  const is_overdue = days_away > calculated_days_away_acceptable;
  return is_overdue;
};
