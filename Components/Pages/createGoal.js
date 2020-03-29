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
  Picker,
  TextInput,
} from "react-native";

import Constants from "expo-constants";

import APIStore from "../Atoms/APIStore";
import BarChart from "../Atoms/BarChart";
import { TextField } from "../Atoms/Fields";
import Theme from "../Atoms/Theme";





function createNew(goal) {
  APIStore.addGoal(goal);
}


// view
const createGoal = ({ navigation, goToPassword, createNew }) => {
  const [selectedValue, setSelectedValue] = useState("daily");
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

    <View style = {styles.Pickercontainer}>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="daily" value="daily" />
        <Picker.Item label="weekly" value="weekly" />
        <Picker.Item label="monthly" value="weekly" />

      </Picker>
    </View>

    </CreateContainer>
  );
};
const { statusBarHeight } = Constants;
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
    Pickercontainer: {
      flex: 1,
      paddingTop: 5,
      alignItems: "center",
    },
});



// export default function App() {
//   const [selectedValue, setSelectedValue] = useState("java");
//   return (
//     <View style={styles.container}>
//       <Picker
//         selectedValue={selectedValue}
//         style={{ height: 50, width: 150 }}
//         onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
//       >
//         <Picker.Item label="Java" value="java" />
//         <Picker.Item label="JavaScript" value="js" />
//       </Picker>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 40,
//     alignItems: "center"
//   }
// });




export default createGoal;
