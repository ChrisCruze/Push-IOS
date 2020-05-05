import React, { useState } from "react";

import SignUpContainer from "../Molecules/SignUpContainer";
import { TextField } from "../Atoms/Fields";

import { AsyncStorage } from "react-native";
import { SIGNUP_URI } from "react-native-dotenv";
import axios from "axios";
import moment from "moment"

const SignUpPassword = ({ navigation }) => {
  const [password, updatePassword] = useState("");

  const onSubmit = () => {
    const email = navigation.getParam("email");
    const userName = navigation.getParam("username");

    axios
      .post(SIGNUP_URI, {
        email,
        password,
        userName,
      })
      .then(response => {
        AsyncStorage.setItem("token_created_date", moment().format())
        AsyncStorage.setItem("token", response["data"]["token"])
      })
      .then(() => {
        navigation.navigate("Goals");
      })
      .catch(function(error) {
        console.log({ error });
      });
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
