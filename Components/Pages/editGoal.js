import * as React from "react";
import { useState, useEffect } from "react";
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
import { useGoalUpdate, useGoalsPull } from "../../API";

const editGoal = ({ navigation }) => {
  const { goals, refetch } = useGoalsPull();
  const { updateGoal } = useGoalUpdate();

  const _id = navigation.getParam("_id");
  useEffect(() => {
    refetch();
  }, []);

  const goals_dict = goals.find(function(D) {
    return D["_id"] == _id;
  });
  const [selectedValue, setSelectedValue] = useState(goals_dict.cadence);
  const [textValue, updateSelectedText] = useState(goals_dict.title);
  const [cadenceValue, updateCadenceValue] = useState(goals_dict.cadenceCount);
  const timeStamps = goals_dict.timeStamps;

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
    updateGoal({
      variables: {
        _id,
        title: textValue,
        cadence: selectedValue,
        cadenceCount: parseInt(cadenceValue) || 0,
        timeStamps: timeStamps,
      },
    });
    navigation.navigate("Goals");
  }

  return (
    <CreateContainer
      title="Edit Goal"
      subtitle="Let's push"
      back={() => navigation.navigate("Goals")}
      nextLabel="Push"
      next={pressNextSubmit}
      // onSubmitEditing={createNew}
      first
      {...{ navigation }}
    >
      <TextField
        style={styles.textInput}
        placeholder="Edit goal"
        keyboardType="textInput"
        autoCapitalize="none"
        returnKeyType="next"
        value={textValue}
        onChangeText={text => updateSelectedText(text)}
        contrast
      />
      <TextField
        style={styles.textInput}
        placeholder="Enter Cadence Goal"
        keyboardType="textInput"
        autoCapitalize="none"
        returnKeyType="next"
        value={String(cadenceValue)}
        onChangeText={text => updateCadenceValue(text)}
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
    marginTop: 25,
    marginBottom: 30,
    borderBottomColor: '#0f0f0f',
    borderBottomWidth: 1,
    height: 50
  },
});

export default editGoal;
