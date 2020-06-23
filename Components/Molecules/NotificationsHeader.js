import * as React from "react";
import moment from "moment";
import {
  FlatList,
  Text,
  StyleSheet,
  View,
  Animated,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import { TextClass } from "../Atoms/Text";
import Theme from "../Atoms/Theme";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const AnimatedText = Animated.createAnimatedComponent(TextClass);
const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);
import { Ionicons } from "@expo/vector-icons";
const NotificationsHeader = ({ onPress }) => {
  return (
    <AnimatedSafeAreaView style={[styles.header, { shadowOpacity: 0 }]}>
      <Animated.View style={[styles.innerHeader, { height: Platform.OS === "android" ? 70 : 80 }]}>
        <TouchableOpacity onPress={onPress} style={styles.settings}>
          <View>
            <Ionicons name="md-arrow-round-back" size={24} color="white" />
          </View>
        </TouchableOpacity>
        <View>
          <AnimatedText type="header2" style={{ fontSize: 30, marginTop: 0, color: "white" }}>
            Notifications
          </AnimatedText>
        </View>
        <TouchableOpacity onPress={onPress} style={styles.settings}>
          <View>
            <Text style={{ color: "black" }}>Clear</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </AnimatedSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  RefreshIndicator: {
    ...StyleSheet.absoluteFillObject,
    paddingTop: Constants.statusBarHeight + 100 + Theme.spacing.base,
  },
  header: {
    backgroundColor: "black", //"white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 8,
    borderBottomLeftRadius: 25,
  },
  innerHeader: {
    marginHorizontal: Theme.spacing.base,
    marginVertical: Platform.OS === "android" ? 10 : 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  list: {
    paddingHorizontal: Theme.spacing.small,
  },
});
export default NotificationsHeader;
