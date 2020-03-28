import * as React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Linking,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import Constants from "expo-constants";

import APIStore from "../Atoms/APIStore";


import BarChart from "../Atoms/BarChart";

const createGoal = ({ navigation }) => {
  return (
    <View style={styles.container}>

    </View>
  );
};
const { statusBarHeight } = Constants;
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default createGoal;
