import React, { useState, useEffect } from "react";
import APIStore from "../Atoms/APIStore";
import moment from "moment";
import { APIClient, useAPI } from "../../API";
import _ from "lodash";
import { useGoalsPull, useGoalCreate, useGoalUpdate } from "../../API";

function goals_array_transform_from_update({ goals, id }) {
  const rest_of_goals = goals.filter(function(D) {
    return D["_id"] != id;
  });
  const identified_goal = goals.find(function(D) {
    return D["_id"] == id;
  });
  const timeStampsList = identified_goal["timeStamps"] || [];
  const timeStampListWithNewOne = timeStampsList.concat(moment().format());
  const identified_goal_with_count = {
    ...identified_goal,
    timeStamps: timeStampListWithNewOne,
  };
  const new_list_of_goals = [identified_goal_with_count, ...rest_of_goals];
  return { goal: identified_goal_with_count, goals_array: new_list_of_goals };
}

function filter_keys_from_object(object, keys) {
  var new_dict = {};
  keys.forEach(function(key) {
    new_dict[key] = object[key];
  });
  return new_dict;
}

function updateGoalAPI({ updateGoal, goal }) {
  const keys = ["_id", "title", "cadence", "cadenceCount", "timeStamps"];
  const transformed_goal = filter_keys_from_object(goal, keys);
  updateGoal({ variables: transformed_goal }); //{ title: "haha", cadence: "weekly", cadenceCount: 3 }
}

export const useGoals = () => {
  const goals_pull_dict = useGoalsPull(); //{ goals, loading }
  const base_goals = goals_pull_dict.goals;
  const [goals, updateGoals] = useState(base_goals);
  const { updateGoal } = useGoalUpdate();

  function pushGoal(id) {
    const { goal, goals_array } = goals_array_transform_from_update({ goals, id });
    updateGoalAPI({ updateGoal, goal });
    updateGoals(goals_array);
  }
  return { goals, pushGoal };
};
