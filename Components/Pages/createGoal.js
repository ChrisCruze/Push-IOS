import React, { useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Snackbar } from "react-native-paper";
import { Dropdown } from "react-native-material-dropdown";
import CreateContainer from "../Molecules/createContainer";
import { TextField } from "../Atoms/Fields";
import { useGoalCreate } from "../../API";

const createGoal = ({ navigation, createNew }) => {
  const { createGoal } = useGoalCreate();
  const [selectedValue, setSelectedValue] = useState("Daily");
  const [textValue, updateSelectedText] = useState("");
  const [cadenceValue, updateCadenceValue] = useState("");
  const [warning, updateWarning] = useState(false);

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
    if (textValue === "" || cadenceValue === "") {
      updateWarning(true);
      return;
    }
    const goal_dict = {
      title: textValue,
      cadence: selectedValue,
      cadenceCount: parseInt(cadenceValue) || 0,
    };
    createGoal({ variables: goal_dict });

    updateSelectedText("");
    updateCadenceValue("");
    setSelectedValue("Daily");

    navigation.navigate("Goals");
  }

  return (
    <React.Fragment>
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
          placeholder="Frequency Count"
          keyboardType="numeric"
          autoCapitalize="none"
          returnKeyType="next"
          onChangeText={text => updateCadenceValue(text)}
          value={cadenceValue}
          contrast
        />
        <Dropdown
          label="Frequency"
          data={data}
          value={selectedValue}
          onChangeText={setSelectedValue}
          pickerStyle={{ top: 420, left: 30 }}
        />
      </CreateContainer>
      <Snackbar
        visible={warning}
        onDismiss={() => updateWarning(false)}
        style={styles.snackbar}
        action={{
          label: "OK",
          onPress: () => updateWarning(false),
        }}
      >
        All fields must be filled in
      </Snackbar>
    </React.Fragment>
  );
};
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    borderColor: "black",
    borderBottomWidth: 2,
    height: 30,
    marginTop: 25,
    marginBottom: 30,
  },
  snackbar: {
    position: "absolute",
    bottom: 25,
    left: width * 0.1,
    width: width * 0.8,
  },
});

export default createGoal;
