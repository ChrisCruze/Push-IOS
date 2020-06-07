import * as React from "react";
import CreateContainer from "../Molecules/createContainer";
import { TextField } from "../Atoms/Fields";
import { Dropdown } from "react-native-material-dropdown";
import {
  FlatList,
  Text,
  StyleSheet,
  View,
  Animated,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
const Notifications = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate("Goals");
        }}
      >
        <Text>Go Back </Text>
      </TouchableWithoutFeedback>
    </SafeAreaView>
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

export default Notifications;
