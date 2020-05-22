import * as React from "react";
import { useState } from "react";
import CreateContainer from "../Molecules/createContainer";
import { StyleSheet } from "react-native";
import { TextField } from "../Atoms/Fields";
import { Dropdown } from "react-native-material-dropdown";
import { useGoalCreate } from "../../API";

const createGoal = ({ navigation, createNew }) => {
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

  function capitalizeEachWord(sentence) {
    var words = sentence.toLowerCase().split(" ");
    for (var i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].substring(1);
    }
    return words.join(" ");
  }

  function pressNextSubmit() {
    let newText = capitalizeEachWord(textValue);
    updateSelectedText(newText);
    const goal_dict = {
      title: newText,
      cadence: selectedValue,
      cadenceCount: parseInt(cadenceValue) || 0,
    };
    createGoal({ variables: goal_dict });
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
