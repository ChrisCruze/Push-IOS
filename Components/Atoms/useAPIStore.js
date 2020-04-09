import React, { useState, useEffect } from "react";
import APIStore from "../Atoms/APIStore";
import moment from "moment";
import { APIClient, useAPI } from "../../API";
import _ from "lodash";

function reformat_keys(D) {
  return { ...D, id: D["_id"] };
}
const goalsFromAPI = () => {
  const { response } = useAPI();
  console.log({ response });
  const is_empty_response = Object.keys(response).length === 0;
  if (is_empty_response) {
    return [];
  } else {
    const response_array = response.data.goals;
    return response_array;
    // console.log({ response_array });
    // return _.map(response_array, reformat_keys);
  }
  // const goals_array = []; //APIStore.goals(); //response.data.goals.toArray();
  // return goals_array;
};

//
// console.log({ responseB: response });
//get goals and save it to state so that I can add a push for goal
export const useGoals = () => {
  const goals_array = goalsFromAPI();
  console.log({ goals_array });
  // const [goals, updateGoals] = useState(APIStore.goals());
  const [goals, updateGoals] = useState(goals_array);

  useEffect(() => {
    updateGoals(goals_array);
  }, [goals_array]);

  console.log({ goals });
  function pushGoal(id) {
    const rest_of_goals = goals.filter(function(D) {
      return D["id"] != id;
    });
    const identified_goal = goals.find(function(D) {
      return D["id"] == id;
    });
    const timeStampsList = identified_goal["timeStamps"];
    const timeStampListWithNewOne = timeStampsList.concat(moment().format());
    const identified_goal_with_count = {
      ...identified_goal,
      timeStamps: timeStampListWithNewOne,
    };
    const new_list_of_goals = [identified_goal_with_count, ...rest_of_goals];
    updateGoals(new_list_of_goals);
  }
  return { goals, pushGoal };
};
