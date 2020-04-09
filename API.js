import React, { Fragment, useState, useEffect } from "react";
import { ApolloClient, ApolloLink, InMemoryCache, HttpLink, gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
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

const QueryDefault = gql`
  query {
    goals {
      title
      _id
      timeStamps
    }
  }
`;

function reformat_keys(D) {
  return { ...D, id: D["_id"] };
}
const goalsFromAPI = response => {
  const data_transformed = { goals: _.map(response.data.goals, reformat_keys) };
  return { ...response, data: data_transformed };
};

export const useAPI = () => {
  const [response, updateResponse] = useState({ data: { goals: [] } });
  const client = APIClient();

  function refresh() {
    client
      .query({
        query: QueryDefault,
      })
      .then(response => updateResponse(goalsFromAPI(response)));
  }
  useEffect(() => {
    refresh();
  }, []);
  return { response, refresh };
};
