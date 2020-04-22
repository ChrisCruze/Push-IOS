import React, { useState } from "react";

import SignUpContainer from "../Molecules/SignUpContainer";
import { TextField } from "../Atoms/Fields";

import { AsyncStorage } from "react-native";
import { SIGNUP_URI } from "react-native-dotenv";

const storeToken = async ({ token }) => {
  try {
    console.log({ token });
    await AsyncStorage.setItem("token", token);
  } catch (error) {
    console.log({ error });
  }
};

function fetch_authenticate({ email, password, userName, navigation }) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({ email: email, password: password, userName: userName });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(SIGNUP_URI, requestOptions)
    .then(response => {
      return response.text();
    })
    .then(result => {
      const token = JSON.parse(result)["token"];
      return token;
    })
    .then(token => {
      storeToken({ token });
      navigation.navigate("Home");
    })
    .catch(error => console.log("error", error));
}

const SignUpPassword = ({ navigation }) => {
  const [password, updatePassword] = useState("");

  const onSubmit = () => {
    const email = navigation.getParam("email");
    const userName = navigation.getParam("username");
    fetch_authenticate({ email, password, userName, navigation });
  };

  return (
    <SignUpContainer
      title="Your Password"
      subtitle="Stay Safe"
      nextLabel="Sign-Up"
      back={() => navigation.navigate("SignUpEmail")}
      next={onSubmit}
      {...{ navigation }}
    >
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

export default SignUpPassword;
