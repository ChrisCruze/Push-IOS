import React, { useState } from "react";
import { TextInput } from "react-native";
import { StyleSheet, View } from "react-native";

import SignUpContainer from "../Molecules/SignUpContainer";
import { TextField } from "../Atoms/Fields";
import Theme from "../Atoms/Theme";
import Text from "../Atoms/Text";
import Switch from "../Atoms/Switch";

const SignUpPassword = ({ navigation }) => {
  const [password, updatePassword] = useState("");

  const onSubmit = () => {
    const email = navigation.getParam("email");
    const username = navigation.getParam("username");
    console.log({ email, username, password });
    navigation.navigate("Home");
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
