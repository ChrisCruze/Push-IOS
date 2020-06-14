import { ApolloClient, InMemoryCache, HttpLink, gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { URI } from "react-native-dotenv";
import { setContext } from "apollo-link-context";
import _ from "lodash";
import { AsyncStorage } from "react-native";
import { useState, useEffect } from "react";

export function APIClient() {
  const httpLink = new HttpLink({
    uri: URI,
  });

  const authLink = setContext(() => {
    return AsyncStorage.getItem("token").then(token => {
      return {
        headers: {
          authorization: token ? `Bearer ${token}` : "",
        },
      };
    });
  });
  const DefaultOptions = {
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  };
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: DefaultOptions,
  });
  return client;
}

function reformat_keys(D) {
  return { ...D, id: D["_id"] };
}

function goals_from_data({ loading, error, data }) {
  if (loading) {
    return [];
  } else if (data == undefined) {
    return [];
  } else {
    const goals_array = data.goals || [];
    const goals_array_transformed = _.map(goals_array, reformat_keys);
    return goals_array_transformed;
  }
}

export const useGoalsPull = () => {
  const GoalsQuery = gql`
    query {
      goals {
        title
        _id
        timeStamps
        cadence
        cadenceCount
      }
    }
  `;
  const { loading, error, data, refetch, networkStatus, called } = useQuery(GoalsQuery);
  const goals = goals_from_data({ loading, error, data });
  return { loading, error, data, goals, refetch, networkStatus, called };
};

export const useGoalCreate = () => {
  const ADD_GOAL = gql`
    mutation($title: String!, $cadence: String!, $cadenceCount: Int!) {
      createGoal(
        goalCreateInput: { title: $title, cadence: $cadence, cadenceCount: $cadenceCount }
      ) {
        title
        _id
      }
    }
  `;
  const [createGoal, { data }] = useMutation(ADD_GOAL);
  return { createGoal, data };
};

export const useGoalUpdate = () => {
  const UPDATE_GOAL = gql`
    mutation(
      $_id: ID!
      $title: String!
      $timeStamps: [String]!
      $cadence: String!
      $cadenceCount: Int!
    ) {
      updateGoal(
        goalUpdateInput: {
          _id: $_id
          timeStamps: $timeStamps
          title: $title
          cadence: $cadence
          cadenceCount: $cadenceCount
        }
      ) {
        title
        _id
      }
    }
  `;
  const [updateGoal, { data }] = useMutation(UPDATE_GOAL);
  return { updateGoal, data };
};

export const useGoalDelete = () => {
  const DELETE_GOAL = gql`
    mutation($_id: ID!) {
      deleteGoal(goalId: $_id)
    }
  `;
  const [deleteGoal, { data }] = useMutation(DELETE_GOAL);
  return { removeGoal: deleteGoal, data };
};

const updateGoalsFromUpdate = ({ goals, _id, title, cadence, cadenceCount, timeStamps }) => {
  const id_order_original = _.map(goals, "_id");
  const copied_goals = [...goals];
  const goals_filtered = copied_goals.filter(D => {
    return D["_id"] != _id;
  });
  const updated_goals = [
    ...goals_filtered,
    { _id, id: _id, title, cadence, cadenceCount, timeStamps },
  ];
  const id_grouped_dict = _.groupBy(updated_goals, "_id");
  const updated_goals_sorted = _.map(id_order_original, id => {
    return id_grouped_dict[id][0];
  });
  return updated_goals_sorted;
};
// refetch will update the local state
// update goal will update the local state directly and send request
// update the response with what is done depending on network statu
export const useGoalState = () => {
  const { goals, refetch, loading, networkStatus, called } = useGoalsPull();
  const [goalsLocal, updateGoalsLocal] = useState(goals);
  const [refetchState, updateRefetchState] = useState(false);

  const { updateGoal } = useGoalUpdate();
  useEffect(() => {
    updateGoalsLocal(goals);
  }, [loading, networkStatus, called, refetchState]);

  const refetchLocal = () => {
    updateRefetchState(!refetchState);
    refetch();
  };

  const updateGoalState = ({ variables: { _id, title, cadence, cadenceCount, timeStamps } }) => {
    const updatedGoals = updateGoalsFromUpdate({
      goals,
      _id,
      title,
      cadence,
      cadenceCount,
      timeStamps,
    });
    updateGoalsLocal(updatedGoals);
    updateGoal({
      variables: { _id, title, cadence, cadenceCount, timeStamps },
    });
  };

  return {
    goals: goalsLocal,
    refetch: refetchLocal,
    loading,
    networkStatus,
    updateGoal: updateGoalState,
  };
};
