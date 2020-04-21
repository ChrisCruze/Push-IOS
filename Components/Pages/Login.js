import React, { useState } from "react";
import SignUpContainer from "../Molecules/SignUpContainer";
import { TextField } from "../Atoms/Fields";
import { ApolloClient, ApolloLink, InMemoryCache, HttpLink, gql } from "apollo-boost";
import { useQuery, useMutation, useApolloClient } from "@apollo/react-hooks";
import { withClientState } from "apollo-link-state";
import { URI } from "react-native-dotenv";

function ClientStateDefine() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjVlOWRjZTA5NWE1NTA5MDAyNGZjZTEzNCIsInVzZXJOYW1lIjoiSGVyb2t1ISIsImVtYWlsIjoidGVzdDJAZ21haWwuY29tIn0sImlhdCI6MTU4NzUwNTQyOSwiZXhwIjoxNTg3NTI3MDI5fQ.o7Sz6TexZathBEKJWXzxYKEaC9GlsQ1Qn3yF68n-M9Q";
  const httpLink = new HttpLink({
    uri: URI,
  });

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
    return forward(operation);
  });
  const DefaultOptions = {
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  };
  const clientState = withClientState({
    link: authLink.concat(httpLink), // Chain it with the HttpLink
    cache: new InMemoryCache(),
    defaultOptions: DefaultOptions,
  });
  return clientState;
}

function fetch_authenticate({ email, password, navigation, client }) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({ email: email, password: password });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://pushpiratesforlife.herokuapp.com/login", requestOptions)
    .then(response => {
      // console.log({ response });
      response.text();
    })
    .then(result => {
      const clientState = ClientStateDefine();
      client.onResetStore(clientState);
      console.log({ client });
      navigation.navigate("Home");
    })
    .catch(error => console.log("error", error));
}

const Login = ({ navigation }) => {
  const [password, updatePassword] = useState("");
  const [email, updateEmail] = useState("");
  const client = useApolloClient();

  const onLoginSubmit = () => {
    //this is where login to the graphql login will go
    console.log({ email, password, client });
    fetch_authenticate({ email, password, navigation, client });
  };

  return (
    <SignUpContainer
      title="Login"
      back={() => navigation.navigate("Welcome")}
      subtitle="Get Started"
      nextLabel="Login"
      next={onLoginSubmit}
      first
      {...{ navigation }}
    >
      <TextField
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={updateEmail}
        value={email}
        returnKeyType="next"
        contrast
      />
      <TextField
        placeholder="Password"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="go"
        onChangeText={updatePassword}
        value={password}
        secureTextEntry
        contrast
      />
    </SignUpContainer>
  );
};

export default Login;
