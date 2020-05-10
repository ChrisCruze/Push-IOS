import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
  Dimensions,
} from "react-native";
import { Neomorph } from "react-native-neomorph-shadows";
import { SwipeListView, SwipeRow } from "react-native-swipe-list-view";
import { Feather as Icon, Ionicons, FontAwesome } from "@expo/vector-icons";

const GoalButtonBackDelete = ({ deleteGoal }) => {
  return (
    <TouchableWithoutFeedback onPress={deleteGoal}>
      <Icon name="trash" size={45} {...{ color: "black" }} />

      {/* <Text style={[styles.buttonText]}>Delete</Text> */}
    </TouchableWithoutFeedback>
  );
};
const GoalButtonBackDashboard = ({ navigateToGoal }) => {
  return (
    <TouchableWithoutFeedback onPress={navigateToGoal}>
      <FontAwesome name="dashboard" size={45} {...{ color: "black" }} />
      {/* <Text style={[styles.buttonText]}>Dashboard</Text> */}
    </TouchableWithoutFeedback>
  );
};

const GoalButtonBack = ({ deleteGoal, navigateToGoal }) => {
  return (
    <View style={[styles.standaloneRowBack]}>
      <GoalButtonBackDashboard navigateToGoal={navigateToGoal} />

      <GoalButtonBackDelete deleteGoal={deleteGoal} />
    </View>
  );
};

const GoalButtonFront = ({ text, totalCount, pushGoal, lastTimeStampMessage, is_overdue }) => {
  const color = is_overdue ? "red" : "green";

  return (
    <TouchableWithoutFeedback onPress={pushGoal}>
      <Neomorph
        darkShadowColor="#D1CDC7" // <- set this
        lightShadowColor="#FFF"
        style={styles.neomorph}
      >
        <View style={styles.topRow}>
          <Text style={styles.task}>{text}</Text>
          <View style={[styles.dash, { borderColor: color }]}>
            <Text style={[styles.frequency, { textDecorationColor: color, color: color }]}>
              {totalCount}
            </Text>
          </View>
        </View>
        <View style={styles.botRow}>
          <Text style={styles.duration}>Last Updated: {lastTimeStampMessage}</Text>
        </View>
      </Neomorph>
    </TouchableWithoutFeedback>
  );
};

const GoalListItem = ({
  text,
  navigateToGoal,
  pushGoal,
  totalCount,
  deleteGoal,
  lastTimeStampMessage,
  is_overdue,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.standalone}>
        <SwipeRow leftOpenValue={75} rightOpenValue={-75}>
          <GoalButtonBack deleteGoal={deleteGoal} navigateToGoal={navigateToGoal} />
          <GoalButtonFront
            text={text}
            totalCount={totalCount}
            pushGoal={pushGoal}
            lastTimeStampMessage={lastTimeStampMessage}
            is_overdue={is_overdue}
          />
        </SwipeRow>
      </View>
    </View>
  );
};
export default GoalListItem;

const { width } = Dimensions.get("window");
const main_background = "#ecf0f1";
const styles = StyleSheet.create({
  container: {
    backgroundColor: main_background,
    flex: 1,
  },
  standalone: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  standaloneRow: {
    height: 120,
    width: width * 0.9,
    alignItems: "center",
  },
  standaloneRowBack: {
    backgroundColor: main_background,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 20,
  },
  textFont: {
    fontSize: 30,
  },
  backTextWhite: {
    color: "black",
  },
  spacer: {
    height: 50,
  },

  neomorph: {
    shadowOpacity: 0.7, // <- and this or yours opacity
    shadowRadius: 30,
    borderRadius: 30,
    borderTopColor: "#FFF",
    borderLeftColor: "#FFF",
    borderBottomColor: "#D1CDC7",
    borderRightColor: "#D1CDC7",
    backgroundColor: "#ECF0F3",
    width: width * 0.85,

    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  task: {
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    fontSize: 28,
  },
  duration: {
    fontSize: 12,
    //   fontWeight: 'bold',
    textAlign: "justify",
  },
  frequency: {
    flex: 1,
    color: "grey",
    textAlign: "center",
    fontSize: 28,
  },
  topRow: {
    width: 250,
    marginTop: 10,
    marginRight: 10,
    flexDirection: "row",
    flex: 2,
  },
  botRow: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
    flexDirection: "row",
    flex: 2,
    textAlign: "center",
  },
  dash: {
    textAlign: "center",
    borderBottomWidth: 3,
    // borderColor: "green",
  },
  buttonText: {
    alignSelf: "center",
    fontSize: 32,
    fontWeight: "bold",
  },
});
