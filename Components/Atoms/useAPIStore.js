import React, { useState, useEffect } from "react";
import APIStore from "../Atoms/APIStore";
import moment from "moment";
import { APIClient, useAPI } from "../../API";
import _ from "lodash";
import { useGoalsPull } from "../../API";

export const useGoals = () => {
  const goals_pull_dict = useGoalsPull(); //{ goals, loading }
  const [goals, updateGoals] = useState(goals_pull_dict.goals);

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
