import * as React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Linking,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import Constants from "expo-constants";

// import { Text, Button, Container, Logo, Theme, AnimatedView } from "../components";
import Theme from "../Atoms/Theme";
import Text from "../Atoms/Text";
import Button from "../Atoms/Button";
import { Feather as Icon } from "@expo/vector-icons";

import Container from "../Atoms/Container";
import { AnimatedView } from "../Atoms/Animations";
import Logo from "../Molecules/Logo";
import APIStore from "../Atoms/APIStore";
import DashboardGoal from "../Organisms/DashboardGoal";

const Goal = ({ navigation }) => {
  const id = navigation.getParam("id");
  const back = () => navigation.navigate("Profile");
  const goals = APIStore.goals();
  const goals_filtered = goals.filter(function(D) {
    return D["id"] == id;
  });
  const goals_dict = goals_filtered[0];
  return (
    <Container gutter={2} style={styles.root}>
      <View style={[styles.header]}>
        <TouchableOpacity onPress={back} style={styles.settings}>
          <View>
            <Icon name="log-out" size={25} color="blue" />
          </View>
        </TouchableOpacity>
      </View>
      <DashboardGoal goals={goals_filtered} />
      <AnimatedView style={styles.container}>
        <Text type="header1" style={styles.header}>
          {goals_dict.title}
        </Text>
      </AnimatedView>
      <AnimatedView style={styles.container}>
        <Text type="header1" style={styles.header}>
          {goals_dict.totalCount}
        </Text>
      </AnimatedView>
    </Container>
  );
};
const { statusBarHeight } = Constants;
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  root: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  container: {
    alignSelf: "stretch",
  },
  // settings: {
  //   position: "absolute",
  //   top: statusBarHeight + Theme.spacing.small,
  //   right: Theme.spacing.base,
  //   backgroundColor: "transparent",
  //   zIndex: 10000,
  // },
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

export default Goal;
