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

import APIStore from "../Atoms/APIStore";
import BarChart from "../Atoms/BarChart";
import { TextField } from "../Atoms/Fields";
import Theme from "../Atoms/Theme";
import { Dropdown } from 'react-native-material-dropdown';



function createNew(goal) {
  APIStore.addGoal(goal);
}


// view
const createGoal = ({ navigation, goToPassword, createNew }) => {
  const [selectedValue, setSelectedValue] = useState("daily");

  const [textValue, updateSelectedText] = useState("default");
  const [cadenceValue, updateCadenceValue] = useState("0");

  let data = [{
    value: 'Daily',
  }, {
    value: 'Weekly',
  }, {
    value: 'Monthly',
  }];

function pressNextSubmit (){
  APIStore.addGoal({
      "id": APIStore.goals().length + 1,
      "title": textValue,
      "cadence": selectedValue,
      "cadenceCount": cadenceValue,
      "totalCount": 0,
      "timeStamps": ["2020-03-21T00:18:56Z"]
  });
  navigation.navigate("Goals")
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

    <Dropdown
      label='Cadence'
      data={data}
      value = {selectedValue}
      onChangeText = {setSelectedValue}
    />

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
    marginTop:25,
    marginBottom:30
  }
});





export default createGoal;
