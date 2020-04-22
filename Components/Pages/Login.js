import React, { useState } from "react";
import SignUpContainer from "../Molecules/SignUpContainer";
import { TextField } from "../Atoms/Fields";
import { AsyncStorage } from "react-native";
import { LOGIN_URI } from "react-native-dotenv";

const storeToken = async ({ token }) => {
  try {
    await AsyncStorage.setItem("token", token);
  } catch (error) {
    console.log({ error });
  }
};

function fetch_authenticate({ email, password, navigation }) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({ email: email, password: password });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(LOGIN_URI, requestOptions)
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

const Login = ({ navigation }) => {
  const [password, updatePassword] = useState("");
  const [email, updateEmail] = useState("");

  const onLoginSubmit = () => {
    fetch_authenticate({ email, password, navigation });
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
