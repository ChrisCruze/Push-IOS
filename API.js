import React, { Fragment, useState, useEffect } from "react";
import { ApolloClient, ApolloLink, InMemoryCache, HttpLink, gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { ApolloProvider } from "@apollo/react-hooks";

import _ from "lodash";

export function APIClient() {
  const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql" });
  const client = new ApolloClient({
    link: httpLink, // Chain it with the HttpLink
    cache: new InMemoryCache(),
  });

  return client;
}

function reformat_keys(D) {
  return { ...D, id: D["_id"] };
}

function goals_from_data({ loading, error, data }) {
  if (loading) {
    return [];
  } else {
    const goals_array = data.goals;
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
      }
    }
  `;
  const { loading, error, data } = useQuery(GoalsQuery);
  const goals = goals_from_data({ loading, error, data });
  return { loading, error, data, goals };
};

export const useGoalCreate = () => {
  const ADD_GOAL = gql`
    mutation createGoal($title: String!) {
      createGoal(title: $title) {
        title
      }
    }
  `;

  const [createGoal, { data }] = useMutation(ADD_GOAL);
  function addGoal() {
    createGoal({ variables: { title: "test" } });
  }
  return { addGoal };
};
