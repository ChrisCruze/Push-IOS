import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Button } from "react-native-elements";
import APIStore from "../Atoms/APIStore";

const GoalOptionsPress = ({ id, navigation }) => {
  console.log(`navigate to options page ${id}`);
  navigation.navigate("Goal", { id: id });
};

const GoalPushsPress = ({ id, pushGoal }) => {
  APIStore.push(id);
  pushGoal(id);
  console.log("record activity now!");
  // updateTotalCount(totalCount + 1);
};

const GoalsCountFromGoalsId = ({ goals, id }) => {
  const goals_filtered = goals.filter(function(D) {
    return D["id"] == id;
  })[0]["timeStamps"];
  const totalCount = goals_filtered.length;
  return totalCount;
};

const GoalCountGet = ({ goals, id }) => {
  const goals_filtered = goals.filter(function(D) {
    return D["id"] == id;
  })[0]["timeStamps"];
  const totalCount = goals_filtered.length;
  return totalCount;
};

const GoalItem = ({ id, title, goals, cadenceCount, navigation, pushGoal }) => {
  const totalCount = GoalCountGet({ goals, id });

  return (
    <View style={styles.container}>
      <Button
        title={`${title} - ${totalCount}`}
        onPress={() => {
          GoalPushsPress({ id, pushGoal });
        }}
        style={styles.mainButton}
      />
      <Icon
        raised
        name="more-horiz"
        type="material"
        color="#f50"
        onPress={() => GoalOptionsPress({ id, navigation })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  mainButton: {
    flexGrow: 15,
    width: 250,
    height: 30,
  },
  optionsButton: { flexGrow: 1 },
  height: 30,
});

export default GoalItem;
