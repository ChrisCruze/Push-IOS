import React, { useState } from "react";

import SignUpContainer from "../Molecules/SignUpContainer";
import { TextField } from "../Atoms/Fields";
import { AsyncStorage, Dimensions, StyleSheet, Text } from "react-native";
import { SIGNUP_URI } from "react-native-dotenv";
import { Snackbar } from "react-native-paper";

import axios from "axios";
import moment from "moment";

const SignUpPassword = ({ navigation }) => {
  const [password, updatePassword] = useState("");
  const [visible, setVisible] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, updateLoading] = useState(false);

  const _onDismissSnackBar = () => {
    setVisible(0), setMessage("");
  };

  const onSubmit = () => {
    const email = navigation.getParam("email");
    const userName = navigation.getParam("username");
    if (userName === "") {
      setMessage("Username can't be empty.");
      setVisible(1);
    } else if (email === "") {
      setMessage("Email can't be empty.");
      setVisible(1);
    } else if (password === "") {
      setMessage("Password can't be empty.");
      setVisible(1);
    } else {
      updateLoading(loading);
      axios
        .post(SIGNUP_URI, {
          email,
          password,
          userName,
        })
        .then(response => {
          AsyncStorage.setItem("token_created_date", moment().format());
          AsyncStorage.setItem("token", response["data"]["token"]);
        })
        .then(() => {
          navigation.navigate("Goals");
        })
        .catch(function(error) {
          updateLoading(false);
          setMessage(error.message);
          setVisible(1);
        });
    }
  };

  const snackbar = (visible, message) => {
    return (
      <Snackbar
        visible={visible}
        onDismiss={_onDismissSnackBar}
        style={styles.snackbar}
        action={{
          label: "Okay",
          onPress: () => {
            // Do something
          },
        }}
      >
        <Text style={styles.message}>{message}</Text>
      </Snackbar>
    );
  };

  return (
    <SignUpContainer
      title="Your Password"
      subtitle="Stay Safe"
      nextLabel="Sign-Up"
      back={() => navigation.navigate("SignUpEmail")}
      next={onSubmit}
      loading={loading}
      snackbar={snackbar(visible, message)}
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

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  snackbar: {
    position: "absolute",
    bottom: 25,
    left: width * 0.1,
    width: width * 0.8,
  },
  message: {
    fontFamily: "SFProText-Medium",
    color: "#FFF",
    fontSize: 14,
  },
});

export default SignUpPassword;
