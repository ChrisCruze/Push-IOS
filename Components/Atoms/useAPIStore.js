import React, { useState } from "react";
import APIStore from "../Atoms/APIStore";
import moment from "moment";

//get goals and save it to state so that I can add a push for goal
export const useGoals = () => {
  const [goals, updateGoals] = useState(APIStore.goals());
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
    const new_list_of_goals = [...rest_of_goals, identified_goal_with_count];
    updateGoals(new_list_of_goals);
  }
  return { goals, pushGoal };
};
