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
import { TextField } from "../Atoms/Fields";
import { Dropdown } from "react-native-material-dropdown";
import { useGoalsPull, useGoalCreate } from "../../API";

const createGoal = ({ navigation, goToPassword, createNew }) => {
  const { createGoal } = useGoalCreate();
  const [selectedValue, setSelectedValue] = useState("Daily");
  const [textValue, updateSelectedText] = useState("");
  const [cadenceValue, updateCadenceValue] = useState(1);

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
    const goal_dict = {
      title: textValue,
      cadence: selectedValue,
      cadenceCount: parseInt(cadenceValue) || 0,
    };
    createGoal({ variables: goal_dict });

    updateSelectedText("");
    updateCadenceValue(1);
    setSelectedValue("Daily");

    navigation.navigate("Goals");
  }

  return (
    <CreateContainer
      title="New Goal"
      subtitle="Let's push"
      back={() => navigation.navigate("Goals")}
      nextLabel="Create"
      next={pressNextSubmit}
      onSubmitEditing={createNew}
      first
      {...{ navigation }}
    >
      <TextField
        style={styles.textInput}
        placeholder="Title"
        keyboardType="default"
        autoCapitalize="words"
        returnKeyType="next"
        onChangeText={text => updateSelectedText(text)}
        value={textValue}
        contrast
      />
      <TextField
        style={styles.textInput}
        placeholder="Cadence Count"
        keyboardType="numeric"
        autoCapitalize="none"
        returnKeyType="next"
        onChangeText={text => updateCadenceValue(text)}
        value={cadenceValue}
        contrast
      />
      <Dropdown label="Cadence" data={data} value={selectedValue} onChangeText={setSelectedValue} />
    </CreateContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    borderColor: "black",
    borderWidth: 1,
    marginTop: 25,
    marginBottom: 30,
  },
});

export default createGoal;
