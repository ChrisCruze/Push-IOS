import * as React from "react";
import SignUpContainer from "../Molecules/SignUpContainer";
import {
  View,
  StyleSheet,
  Dimensions,
  Linking,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { TextField } from "../Atoms/Fields";
import Constants from "expo-constants";

import APIStore from "../Atoms/APIStore";
import BarChart from "../Atoms/BarChart";

function createNew(goal) {
  APIStore.addGoal(goal);
}


// view
const createGoal = ({ navigation, goToPassword, createNew }) => {
  return (
    <SignUpContainer
      title="New Goal"
      back={() => navigation.navigate("Goals")}
      nextLabel="Push"
      next={() => navigation.navigate("Goals")}
      onSubmitEditing={createNew}
      first
      {...{ navigation }}
    >
    <TextField
      placeholder="Email"
      keyboardType="email-address"
      autoCapitalize="none"
      autoCorrect={false}
      returnKeyType="next"
      onSubmitEditing={goToPassword}
      contrast
    />

    </SignUpContainer>
  );
};
const { statusBarHeight } = Constants;
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});



export default createGoal;
