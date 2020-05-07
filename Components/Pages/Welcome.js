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
import { AsyncStorage } from "react-native";
import moment from "moment"

function determine_number_of_hours_since_created(token_created_date){
  const token_created_date_moment = moment(token_created_date)
  const now = moment()
  const diff = now.diff(token_created_date_moment);
  const diffDuration = moment.duration(diff);
  const difference_hours = diffDuration.hours()
  const difference_minutes = diffDuration.minutes()
  return difference_hours
}

function determine_is_not_expired(token_created_date){
  const has_token = token_created_date != '' && token_created_date != null 
  const hours = determine_number_of_hours_since_created(token_created_date)
  const within_expiration = hours < 1
  return has_token && within_expiration
}

const AuthCheckNavigate = ({navigation}) =>{
  AsyncStorage.getItem("token_created_date").then(token_created_date => {
    const already_logged_in = determine_is_not_expired(token_created_date)
    if (already_logged_in){
        navigation.navigate("Goals")
      }
  })
}


const Welcome = ({ navigation }) => {
  const login = () => navigation.navigate("Login");
  const signUp = () => navigation.navigate("SignUp");
  AuthCheckNavigate({navigation})
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
