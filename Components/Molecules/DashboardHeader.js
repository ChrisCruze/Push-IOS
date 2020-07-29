import React from "react";
import { StyleSheet, View, Animated, SafeAreaView, Dimensions } from "react-native";
import { TextClass } from "../Atoms/Text";
import Theme from "../Atoms/Theme";
import HeaderButtons from "./HeaderButtons";
import TimeRangeSubHeader from "../Atoms/TimeRangeSubHeader";

const AnimatedText = Animated.createAnimatedComponent(TextClass);
const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

const DashboardHeader = ({ title, logout, updateFilter, filter, navigation }) => {
  return (
    <AnimatedSafeAreaView style={[styles.header, { shadowOpacity: 0 }]}>
      <HeaderButtons navigation={navigation} logout={logout} />
      <Animated.View style={[styles.innerHeader, { height: Platform.OS === "android" ? 85 : 80 }]}>
        <View>
          <AnimatedText
            type="header2"
            style={{
              fontSize: 36,
              marginTop: Platform.OS === "android" ? 0 : 24,
              color: "white",
              width: Dimensions.get("window").width * 0.9,
            }}
          >
            {title || "title"}
          </AnimatedText>
          <TimeRangeSubHeader filter={filter} updateFilter={updateFilter} />
        </View>
      </Animated.View>
    </AnimatedSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  subheader: {
    backgroundColor: "#FFF9FD", // Theme.palette.background, // Theme.palette.background, //"white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 8,
    zIndex: 100,
  },
  innerSubHeader: {
    marginHorizontal: Theme.spacing.base,
    marginVertical: Theme.spacing.tiny,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    backgroundColor: "black", //"white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 8,
    zIndex: 10000,

    borderBottomLeftRadius: 25,
  },
  innerHeader: {
    marginHorizontal: Theme.spacing.base,
    marginVertical: Theme.spacing.tiny,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Platform.OS === "android" ? 5 : 20,
  },
  innerTimeSubHeader: {
    marginHorizontal: 20,
    marginVertical: Theme.spacing.tiny,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
  },
  innerTimeSubHeaderSelected: {
    borderRadius: 25,
    paddingHorizontal: 15,
  },
  settings: {
    color: "#ffffff",
  },
});
export default DashboardHeader;
