import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Snackbar } from "react-native-paper";
import { Dropdown } from "react-native-material-dropdown";
import CreateContainer from "../Molecules/createContainer";
import { TextField } from "../Atoms/Fields";
import { useGoalUpdate, useGoalsPull } from "../../API";

const editGoal = ({ navigation }) => {
  const { goals, refetch } = useGoalsPull();
  const { updateGoal } = useGoalUpdate();

  const _id = navigation.getParam("_id");
  useEffect(() => {
    refetch();
  }, []);

  const goals_dict = goals.find(function (D) {
    return D["_id"] == _id;
  });
  const [warning, updateWarning] = useState(false);
  const [selectedValue, setSelectedValue] = useState(goals_dict.cadence);
  const [textValue, updateSelectedText] = useState(goals_dict.title);
  const [cadenceValue, updateCadenceValue] = useState(String(goals_dict.cadenceCount));
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
    if (textValue === "" || cadenceValue === "") {
      updateWarning(true);
      return;
    }

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
    <React.Fragment>
      <CreateContainer
        title="Edit Goal"
        subtitle="Let's push"
        back={() => navigation.navigate("Goals")}
        nextLabel="Update"
        next={pressNextSubmit}
        first
        {...{ navigation }}
      >
        <TextField
          style={styles.textInput}
          placeholder="Title"
          keyboardType="default"
          autoCapitalize="none"
          returnKeyType="next"
          value={textValue}
          onChangeText={text => updateSelectedText(text)}
          contrast
        />
        <TextField
          style={styles.textInput}
          placeholder="Frequency Count"
          keyboardType="numeric"
          autoCapitalize="none"
          returnKeyType="next"
          value={String(cadenceValue)}
          onChangeText={text => updateCadenceValue(text)}
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

export default editGoal;
