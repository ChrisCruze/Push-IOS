import React, { useState } from "react";
import SignUpContainer from "../Molecules/SignUpContainer";
import { TextField } from "../Atoms/Fields";
import { AsyncStorage } from "react-native";
import { LOGIN_URI } from "react-native-dotenv";
import axios from "axios";

const Login = ({ navigation }) => {
  const [password, updatePassword] = useState("");
  const [email, updateEmail] = useState("");

  const onLoginSubmit = () => {
    axios
      .post(LOGIN_URI, {
        email,
        password,
      })
      .then(response => AsyncStorage.setItem("token", response["data"]["token"]))
      .then(() => {
        navigation.navigate("Home");
      })
      .catch(function(error) {
        console.log({ error });
      });
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
