import _ from "lodash";
import moment from "moment";

const difference_between_numbers = l => {
  var empty_list = [];
  l.forEach(function(i, num) {
    if (num != 0) {
      const previous = l[num - 1];
      const current = i;
      const difference = Math.abs(current - previous);
      if (difference > 1) {
        empty_list.push(num);
      }
    }
  });
  empty_list.push(l.length);
  return empty_list;
};
const get_unique_days = timeStamps => {
  const grouped_dict = _.groupBy(timeStamps, timeStamp => moment(timeStamp).dayOfYear());
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
    const days = get_unique_days(timeStamps);
    return days;
  } else if (is_weekly) {
    return get_unique_weeks(timeStamps);
  } else if (is_monthly) {
    return get_unique_months(timeStamps);
  } else {
    return get_unique_days(timeStamps);
  }
};
//timeStamps = ["2020-05-28T12:29:20-04:00", "2020-05-31T11:42:20-04:00", "2020-06-03T15:38:23-04:00", "2020-06-04T00:27:24-04:00", "2020-06-05T21:11:56-04:00", "2020-06-07T16:02:14-04:00", "2020-06-08T09:44:16-04:00", "2020-06-09T20:29:11-04:00", "2020-06-10T23:43:21-04:00", ]
export const determineStreak = ({ timeStamps, cadence }) => {
  const uniques = getUniquesBasedOnCadence({ timeStamps, cadence });
  uniques.reverse();
  const diffs = difference_between_numbers(uniques);
  const longest_streak = diffs[0];
  return longest_streak;
};

const getStreaks = l => {
  return l.reduce((arr, val, i, a) => {
    if (!i || val !== a[i - 1] + 1) arr.push([]);
    arr[arr.length - 1].push(val);
    return arr;
  }, []);
};
const getStreakLongest = l => {
  const streaks = getStreaks(l);
  const streakCounts = _.map(streaks, subli => subli.length);
  return _.max(streakCounts);
};
export const determineStreakLongest = ({ timeStamps, cadence }) => {
  const uniques = getUniquesBasedOnCadence({ timeStamps, cadence });
  const longest_streak = getStreakLongest(uniques);
  return longest_streak;
};

export const timeStampsFromGoals = ({ goals }) => {
  const timeStamps = _.map(goals, ({ timeStamps }) =>
    _.max(timeStamps, function(timeStamp) {
      return moment(timeStamp).unix();
    }),
  );
  return timeStamps;
};

export const numbersSum = numbers => {
  return _.reduce(
    numbers,
    function(memo, num) {
      var r = memo + (parseFloat(num) || 0);
      return r;
    },
    0,
  );
};

export const numbersAvg = numbers => {
  const total_sum = numbersSum(numbers);
  const avg = total_sum / numbers.length;
  return avg;
};
export const daysAgoCalculate = oldestTimeStamp => {
  const minutes_oldest = moment().diff(moment(oldestTimeStamp), "minutes");
  const hours_oldest = minutes_oldest / 60;
  const days_oldest = hours_oldest / 24;
  return days_oldest;
};
export const pushCountFromGoals = ({ goals }) => {
  const timeStamps = _.map(goals, ({ timeStamps }) => timeStamps.length);
  return timeStamps;
};

export const maxPushCountofGoals = ({ goals }) => {
  const pushCountList = pushCountFromGoals({ goals });
  const maxPushCount = _.max(pushCountList);
  return maxPushCount;
};

export const cadenceTextConvert = cadence => {
  const cadenceText = cadence == "Daily" ? "Day" : cadence == "Weekly" ? "Wk" : "Mo";
  return cadenceText;
};
