import React, { Fragment, useState, useEffect } from "react";
import { ApolloClient, ApolloLink, InMemoryCache, HttpLink, gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { ApolloProvider } from "@apollo/react-hooks";
import { URI } from "react-native-dotenv";
import { setContext } from "apollo-link-context";
import _ from "lodash";
import { AsyncStorage } from "react-native";

const retrieveLocalStorageToken = async () => {
  const token = await AsyncStorage.getItem("token");
  return token;
};

export function APIClient() {
  const httpLink = new HttpLink({
    uri: URI,
  });

  const authLink = setContext((_, { headers }) => {
    return retrieveLocalStorageToken().then(token => {
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
export const useUserPull = () => {
  const Query = gql`
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
  const { loading, error, data, refetch, client } = useQuery(Query);
  return { loading, error, data, goals, refetch, client };
};
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
  const { loading, error, data, refetch } = useQuery(GoalsQuery);
  const goals = goals_from_data({ loading, error, data });
  return { loading, error, data, goals, refetch };
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
