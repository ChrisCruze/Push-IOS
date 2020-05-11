import React, { useState } from "react";
import { AsyncStorage, Dimensions, StyleSheet, Text } from "react-native";
import { LOGIN_URI } from "react-native-dotenv";
import { Snackbar } from "react-native-paper";
import { TextField } from "../Atoms/Fields";
import SignUpContainer from "../Molecules/SignUpContainer";
import axios from "axios";
import moment from "moment";

const Login = ({ navigation }) => {
  const [loading, updateLoading] = useState(false);

  const [password, updatePassword] = useState("");
  const [email, updateEmail] = useState("");
  const [visible, setVisible] = useState(0);
  const [message, setMessage] = useState("");

  const _onDismissSnackBar = () => {
    setVisible(0), setMessage("");
  };

  const onLoginSubmit = () => {
    if (email === "") {
      setMessage("Email can't be empty.");
      setVisible(1);
    } else if (password === "") {
      setMessage("Password can't be empty.");
      setVisible(1);
    } else {
      updateLoading(true);
      axios
        .post(LOGIN_URI, {
          email,
          password,
        })
        .then(response => {
          AsyncStorage.setItem("token_created_date", moment().format());
          AsyncStorage.setItem("token", response["data"]["token"]);
        })

        .then(() => {
          navigation.navigate("Goals");
        })
        .catch(error => {
          updateLoading(false);
          if (error.message === "Request failed with status code 404") {
            setMessage("User not found");
          } else if (error.message === "Request failed with status code 401") {
            setMessage("Incorrect Password");
          }
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
      title="Login"
      back={() => navigation.navigate("Welcome")}
      subtitle="Get Started"
      nextLabel="Login"
      next={onLoginSubmit}
      first
      snackbar={snackbar(visible, message)}
      loading={loading}
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

export default Login;
