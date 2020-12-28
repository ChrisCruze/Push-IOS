import React, { useEffect } from "react";
import { StyleSheet, Dimensions, TouchableOpacity, AsyncStorage, Platform } from "react-native";
import moment from "moment";
import * as Google from "expo-google-app-auth";
import {
  GOOGLE_SIGN_IN_CLIENT_ID_IOS,
  GOOGLE_SIGN_IN_CLIENT_ID_ANDROID,
  SIGN_IN_OATH_URI,
} from "react-native-dotenv";
import axios from "axios";

import Theme from "../Atoms/Theme";
import Text from "../Atoms/Text";
import Button from "../Atoms/Button";
import Container from "../Atoms/Container";
import { AnimatedView } from "../Atoms/Animations";
import Logo from "../Molecules/Logo";

function determine_number_of_hours_since_created(token_created_date) {
  const token_created_date_moment = moment(token_created_date);
  const now = moment();
  const diff = now.diff(token_created_date_moment);
  const diffDuration = moment.duration(diff);
  const difference_hours = diffDuration.hours();
  return difference_hours;
}

function determine_is_not_expired(token_created_date) {
  const has_token = token_created_date != "" && token_created_date != null;
  const hours = determine_number_of_hours_since_created(token_created_date);
  const within_expiration = hours < 2160;
  return has_token && within_expiration;
}

const authCheckAndNavigate = async ({ navigation }) => {
  AsyncStorage.getItem("token_created_date").then(token_created_date => {
    const already_logged_in = determine_is_not_expired(token_created_date);
    if (already_logged_in) {
      navigation.navigate("Goals");
    }
  });
};

const Welcome = ({ navigation }) => {
  useEffect(() => {
    authCheckAndNavigate({ navigation });
  }, []);

  const login = () => navigation.navigate("Login");
  const signUp = () => navigation.navigate("SignUp");

  const signInWithGoogle = async () => {
    try {
      const { type, idToken } = await Google.logInAsync({
        scopes: ["email", "openid"],
        clientId:
          Platform.OS === "android"
            ? GOOGLE_SIGN_IN_CLIENT_ID_ANDROID
            : GOOGLE_SIGN_IN_CLIENT_ID_IOS,
      });
      if (type === "success") {
        axios
          .post(SIGN_IN_OATH_URI, {
            token: idToken,
            oAuthType: "google",
          })
          .then(response => {
            const jwt = response["data"]["token"];
            if (jwt) {
              AsyncStorage.setItem("token_created_date", moment().format());
              AsyncStorage.setItem("token", jwt);
            }
          })
          .then(() => {
            authCheckAndNavigate({ navigation });
          })
          .catch(error => {
            console.error(error);
          });
      }
    } catch ({ message }) {
      console.error("login: Error:" + message);
    }
  };

  return (
    <Container gutter={2} style={styles.root}>
      <Logo />
      <AnimatedView style={styles.container}>
        <Text type="header1" style={styles.header}>
          Push
        </Text>
      </AnimatedView>
      <AnimatedView style={styles.container} delay={600} duration={300}>
        <Button
          label="Login"
          onPress={login}
          full
          white
          style={{ backgroundColor: Theme.palette.buttonTheme, borderRadius: 32 }}
        />
        <Button label="Sign Up" onPress={signUp} full />
        <Button label="Sign in with Google" onPress={signInWithGoogle} full />
      </AnimatedView>
      <TouchableOpacity style={styles.framer} onPress={Welcome.framer}>
        <Text type={"regular"} style={styles.framerText}></Text>
      </TouchableOpacity>
    </Container>
  );
};

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  root: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  container: {
    alignSelf: "stretch",
  },
  header: {
    textAlign: "center",
    marginTop: Theme.spacing.base * 2,
    marginBottom: Theme.spacing.base * 2,
  },
  framer: {
    position: "absolute",
    bottom: Theme.spacing.tiny,
    width,
  },
  framerText: {
    textAlign: "center",
    fontSize: 12,
  },
});

export default Welcome;
