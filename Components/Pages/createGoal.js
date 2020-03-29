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
  let data = [{
    value: 'Daily',
  }, {
    value: 'Weekly',
  }, {
    value: 'Monthly',
  }];
  return (

    <CreateContainer
      title="New Goal"
      subtitle="Let's push"
      back={() => navigation.navigate("Goals")}
      nextLabel="Push"
      next={() =>
        navigation.navigate("Goals")}
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
      onSubmitEditing={goToPassword}
      contrast
    />
    <Dropdown
      label='Cadence'
      data={data}
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
