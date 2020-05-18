import React from "react";
import Welcome from "./Components/Pages/Welcome";
import Login from "./Components/Pages/Login";
import SignUpName from "./Components/Pages/SignUpName";
import SignUpEmail from "./Components/Pages/SignUpEmail";
import SignUpPassword from "./Components/Pages/SignUpPassword";
import createGoal from "./Components/Pages/createGoal";
import HomeTab from "./Components/Pages/HomeTab";
import Goal from "./Components/Pages/Goal";
import Goals from "./Components/Pages/Goals";
import ForgotPassword from "./Components/Pages/ForgotPassword";
import Dashboard from "./Components/Pages/Dashboard";
import editGoal from "./Components/Pages/editGoal";

import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Feather } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { ApolloProvider } from "@apollo/react-hooks";

import { APIClient } from "./API";

const SFProTextMedium = require("./assets/fonts/SF-Pro-Text-Medium.otf");
const SFProTextHeavy = require("./assets/fonts/SF-Pro-Text-Heavy.otf");
const SFProTextBold = require("./assets/fonts/SF-Pro-Text-Bold.otf");
const SFProTextSemibold = require("./assets/fonts/SF-Pro-Text-Semibold.otf");
const SFProTextRegular = require("./assets/fonts/SF-Pro-Text-Regular.otf");
const SFProTextLight = require("./assets/fonts/SF-Pro-Text-Light.otf");
const Roboto_medium = require("./assets/fonts/Roboto_medium.ttf");
const Roboto = require("./assets/fonts/Roboto.ttf");

class App extends React.Component {
  state = {
    isReady: false,
  };
  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          autoHideSplash={true}
          startAsync={this.loadStaticResources}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    } else {
      const client = APIClient();
      return (
        <ApolloProvider client={client}>
          <AppNavigator />
        </ApolloProvider>
      );
    }
  }
  async loadStaticResources() {
    try {
      // const images = Images.downloadAsync();
      const images = [require("./assets/images/logo.jpg")];
      const cacheImages = images.map(image => {
        return Asset.fromModule(image).downloadAsync();
      });
      const fonts = Font.loadAsync({
        "SFProText-Medium": SFProTextMedium,
        "SFProText-Heavy": SFProTextHeavy,
        "SFProText-Bold": SFProTextBold,
        "SFProText-Semibold": SFProTextSemibold,
        "SFProText-Regular": SFProTextRegular,
        "SFProText-Light": SFProTextLight,
        "Roboto_medium": Roboto_medium,
        "Roboto": Roboto,
      });
      const icons = Font.loadAsync(Feather.font);
      await Promise.all([...cacheImages, fonts, icons]);
      // await Promise.all([fonts, icons]);
    } catch (error) {
      console.error(error);
    }
  }
}

const StackNavigatorOptions = {
  headerMode: "none",
  cardStyle: {
    backgroundColor: "white",
  },
};

const SignUpNavigator = createStackNavigator(
  {
    SignUp: { screen: SignUpName },
    SignUpEmail: { screen: SignUpEmail },
    SignUpPassword: { screen: SignUpPassword },
  },
  StackNavigatorOptions,
);

const Home = createBottomTabNavigator(
  {
    Dashboard: { screen: Dashboard },
    Goals: { screen: Goals },
  },
  {
    animationEnabled: true,
    tabBarComponent: HomeTab,
    tabBarPosition: "bottom",
  },
);

const AppNavigator = createAppContainer(
  createSwitchNavigator(
    {
      Welcome: { screen: Welcome },
      Login: { screen: Login },
      SignUp: { screen: SignUpNavigator },
      ForgotPassword: { screen: ForgotPassword },
      Home: { screen: Home },
      Goal: { screen: Goal },
      createGoal: { screen: createGoal },
      editGoal: { screen: editGoal },
    },
    StackNavigatorOptions,
  ),
);

export { AppNavigator };

export default App;
