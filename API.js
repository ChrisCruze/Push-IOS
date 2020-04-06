import React, { Fragment, useState, useEffect } from "react";
import { ApolloClient, ApolloLink, InMemoryCache, HttpLink, gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { ApolloProvider } from "@apollo/react-hooks";

export function APIClient() {
  const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql" });

  const DefaultOptions = {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  };
  const client = new ApolloClient({
    link: httpLink, // Chain it with the HttpLink
    cache: new InMemoryCache(),
    // defaultOptions: DefaultOptions,
  });

  return client;
}
