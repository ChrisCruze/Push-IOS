import * as React from "react";
import { StyleSheet, Dimensions, Linking, TouchableOpacity } from "react-native";
// import { Text, Button, Container, Logo, Theme, AnimatedView } from "../components";
import Theme from "../Atoms/Theme";
import Text from "../Atoms/Text";
import Button from "../Atoms/Button";

import Container from "../Atoms/Container";
import { AnimatedView } from "../Atoms/Animations";
import Logo from "../Molecules/Logo";
import { ApolloClient, ApolloLink, InMemoryCache, HttpLink, gql } from "apollo-boost";

import { APIClient, useAPI } from "../../API";

const Welcome = ({ navigation }) => {
  const login = () => navigation.navigate("Login");
  const signUp = () => navigation.navigate("SignUp");

  return (
    <Container gutter={2} style={styles.root}>
      <Logo />
      <AnimatedView style={styles.container}>
        <Text type="header1" style={styles.header}>
          Push
        </Text>
      </AnimatedView>
      <AnimatedView style={styles.container} delay={600} duration={300}>
        <Button label="Login" onPress={login} full primary />
        <Button label="Sign Up" onPress={signUp} full />
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
