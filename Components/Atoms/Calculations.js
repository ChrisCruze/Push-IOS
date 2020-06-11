import _ from "lodash";
import moment from "moment";

const unix_to_days = timeStamp => {
  return parseInt(moment(timeStamp).unix() / 86400);
};
const get_unique_days = timeStamps => {
  const grouped_dict = _.groupBy(timeStamps, timeStamp => unix_to_days(timeStamp));
  return Object.keys(grouped_dict);
};

const get_unique_weeks = timeStamps => {
  const grouped_dict = _.groupBy(timeStamps, timeStamp => moment(timeStamp).week());
  return Object.keys(grouped_dict);
};
const get_unique_months = timeStamps => {
  const grouped_dict = _.groupBy(timeStamps, timeStamp => moment(timeStamp).month());
  return Object.keys(grouped_dict);
};

const getUniquesBasedOnCadence = ({ timeStamps, cadence }) => {
  const is_daily = String(cadence).toLowerCase() == "daily";
  const is_weekly = String(cadence).toLowerCase() == "weekly";
  const is_monthly = String(cadence).toLowerCase() == "monthly";
  if (is_daily) {
    return get_unique_days(timeStamps);
  } else if (is_weekly) {
    return get_unique_weeks(timeStamps);
  } else if (is_monthly) {
    return get_unique_months(timeStamps);
  } else {
    return get_unique_days(timeStamps);
  }
};

const determine_consecutive_going_back = () => {};
export const determineStreak = ({ timeStamps, cadence }) => {
  const uniques = getUniquesBasedOnCadence({ timeStamps, cadence });

  return uniques;
};
