import * as React from "react";
import { useState } from "react";
import CreateContainer from "../Molecules/createContainer";
import {
  View,
  StyleSheet,
  Dimensions,
  Linking,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";

import Constants from "expo-constants";

import BarChart from "../Atoms/BarChart";
import { TextField } from "../Atoms/Fields";
import Theme from "../Atoms/Theme";
import { Dropdown } from "react-native-material-dropdown";

import { useGoalsPull, useGoalCreate } from "../../API";

// view
const createGoal = ({ navigation, goToPassword, createNew }) => {
  const { createGoal } = useGoalCreate();

  const [selectedValue, setSelectedValue] = useState("daily");

  const [textValue, updateSelectedText] = useState("default");
  const [cadenceValue, updateCadenceValue] = useState("0");

  let data = [
    {
      value: "Daily",
    },
    {
      value: "Weekly",
    },
    {
      value: "Monthly",
    },
  ];

  function pressNextSubmit() {
    const goal_dict = { title: textValue, cadence: selectedValue, cadenceCount: parseInt(cadenceValue)||0 };
    createGoal({ variables: goal_dict }); //{ title: "haha", cadence: "weekly", cadenceCount: 3 }
    navigation.navigate("Goals");
  }

  return (
    <CreateContainer
      title="New Goal"
      subtitle="Let's push"
      back={() => navigation.navigate("Goals")}
      nextLabel="Push"
      next={pressNextSubmit}
      onSubmitEditing={createNew}
      first
      {...{ navigation }}
    >
      <TextField
        style={styles.textInput}
        placeholder="Create goal"
        keyboardType="textInput"
        autoCapitalize="none"
        returnKeyType="next"
        onChangeText={text => updateSelectedText(text)}
        contrast
      />
      <TextField
        style={styles.textInput}
        placeholder="Enter Cadence Goal"

        keyboardType="textInput"
        autoCapitalize="none"
        returnKeyType="next"
        onChangeText={text => updateCadenceValue(text)}

        contrast
      />

      <Dropdown label="Cadence" data={data} value={selectedValue} onChangeText={setSelectedValue} />
    </CreateContainer>
  );
};
const { statusBarHeight } = Constants;
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    marginTop: 25,
    marginBottom: 30,
  },
});

export default createGoal;
