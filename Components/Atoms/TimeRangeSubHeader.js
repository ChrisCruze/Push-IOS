import React, { useState, useEffect, Fragment } from "react";
import {
  StyleSheet,
  View,
  Animated,
  SafeAreaView,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { TextClass } from "../Atoms/Text";
import Theme from "../Atoms/Theme";

const AnimatedText = Animated.createAnimatedComponent(TextClass);

const AnimatedSubHeaderTimeIntervalText = ({ text, cadence, updateFilter, filter }) => {
  const is_active = filter.cadence == cadence;
  const background_color = is_active ? "#005AFF" : "black";
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        updateFilter({ ...filter, cadence });
      }}
    >
      <View style={[styles.innerTimeSubHeaderSelected, { backgroundColor: background_color }]}>
        <AnimatedText type="header3" style={{ fontSize: 12, color: "white" }}>
          {text}
        </AnimatedText>
      </View>
    </TouchableWithoutFeedback>
  );
};
const TimeRangeSubHeader = ({ filter, updateFilter }) => {
  return (
    <View style={[styles.innerTimeSubHeader]}>
      <AnimatedSubHeaderTimeIntervalText
        text={"All"}
        filter={filter}
        updateFilter={updateFilter}
        cadence={"all"}
      />
      <AnimatedSubHeaderTimeIntervalText
        text={"Today"}
        filter={filter}
        updateFilter={updateFilter}
        cadence={"daily"}
      />
      <AnimatedSubHeaderTimeIntervalText
        text={"Week"}
        filter={filter}
        updateFilter={updateFilter}
        cadence={"weekly"}
      />
      <AnimatedSubHeaderTimeIntervalText
        text={"Month"}
        filter={filter}
        updateFilter={updateFilter}
        cadence={"monthly"}
      />
    </View>
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
export default TimeRangeSubHeader;
