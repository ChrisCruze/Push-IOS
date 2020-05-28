import * as React from "react";
import CreateContainer from "../Molecules/createContainer";
import { StyleSheet } from "react-native";
import { TextField } from "../Atoms/Fields";
import { Dropdown } from "react-native-material-dropdown";

const Notification = ({ navigation }) => {
  // const { createGoal } = useGoalCreate();
  // const [selectedValue, setSelectedValue] = useState("daily");
  // const [textValue, updateSelectedText] = useState("default");
  // const [cadenceValue, updateCadenceValue] = useState("0");

  function pressNextSubmit() {
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
        keyboardType="default"
        autoCapitalize="none"
        returnKeyType="next"
        onChangeText={text => updateSelectedText(text)}
        contrast
      />
      <TextField
        style={styles.textInput}
        placeholder="Enter Cadence Goal"
        keyboardType="default"
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

export default Notification;
