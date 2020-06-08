import React, { useState, useEffect, Fragment } from "react";
import moment from "moment";
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
import Constants from "expo-constants";
import { TextClass } from "../Atoms/Text";
import Theme from "../Atoms/Theme";
import {
  DataFlattenConvertGoals,
  determineOverDue,
  GoalsFilterCadence,
} from "../Atoms/BarChart.functions";
import { Feather as Icon, Ionicons, FontAwesome } from "@expo/vector-icons";
import LoadingIndicator from "../Atoms/LoadingIndicator";
import HeaderButtons from "./HeaderButtons";

const AnimatedText = Animated.createAnimatedComponent(TextClass);
const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const AnimatedSubHeaderMetrics = ({ goals, updateFilter, filter }) => {
  const filtered_goals = GoalsFilterCadence({ goals, cadence: filter.cadence });
  const number_of_goals = filtered_goals.length;
  const number_of_pushes = DataFlattenConvertGoals(filtered_goals).length;
  const completed_count = filtered_goals.filter(function(D) {
    return !determineOverDue({ ...D, goals: filtered_goals });
  }).length;
  const remaining_count = filtered_goals.filter(function(D) {
    return determineOverDue({ ...D, goals: filtered_goals });
  }).length;
  const complete_percentage = ((completed_count / number_of_goals) * 100).toFixed(0);
  return (
    <Fragment>
      <TouchableWithoutFeedback
        onPress={() => {
          updateFilter({ ...filter, state: "incomplete" });
        }}
      >
        <View>
          <AnimatedText type="large">{remaining_count + " Left"}</AnimatedText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => {
          updateFilter({ ...filter, state: "complete" });
        }}
      >
        <View>
          <AnimatedText type="large">{completed_count + " Done"}</AnimatedText>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => {
          updateFilter({ ...filter, state: "all" });
        }}
      >
        <View>
          <AnimatedText type="large">{filtered_goals.length + " Total"}</AnimatedText>
        </View>
      </TouchableWithoutFeedback>
      <View>
        <AnimatedText type="large">{complete_percentage + "%"}</AnimatedText>
      </View>
    </Fragment>
  );
};

const AnimatedSubHeaderSort = ({ sortOrder, updateSortOrder }) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        updateSortOrder(sortOrder == "none" ? "desc" : sortOrder == "desc" ? "asc" : "none");
      }}
    >
      <View>
        {sortOrder == "none" ? (
          <AnimatedText type="large">Sort</AnimatedText>
        ) : sortOrder == "desc" ? (
          <FontAwesome name="sort-down" size={25} {...{ color: Theme.palette.lightGray }} />
        ) : (
          <FontAwesome name="sort-up" size={25} {...{ color: Theme.palette.lightGray }} />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const AnimatedSubHeader = ({
  scrollAnimation,
  goals,
  updateSortOrder,
  sortOrder,
  updateFilter,
  filter,
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 1000 }).start();
  }, []);
  return (
    <AnimatedSafeAreaView
      style={[
        styles.subheader,
        { opacity: 1, transform: [{ translateY: 0 }] }, //translateY: transformY
      ]}
    >
      <Animated.View style={[styles.innerSubHeader, { opacity: fadeAnim }]}>
        <AnimatedSubHeaderSort sortOrder={sortOrder} updateSortOrder={updateSortOrder} />
        <AnimatedSubHeaderMetrics goals={goals} updateFilter={updateFilter} filter={filter} />
      </Animated.View>
    </AnimatedSafeAreaView>
  );
};

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
const AnimatedSubHeaderTimeInterval = ({ filter, updateFilter }) => {
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

const AnimatedHeader = ({
  title,
  sub_title,
  logout,
  logout_text,
  children,
  goals,
  refetch,
  updateSortOrder,
  sortOrder,
  updateFilter,
  filter,
  scrollAnimation,
  navigation,
}) => {
  const [showDetailHeader, updateShowDetailHeader] = useState(false);
  scrollAnimation.addListener(({ value }) => {
    if (value < -20) {
      updateShowDetailHeader(true);
    }
  });
  const opacity = scrollAnimation.interpolate({
    inputRange: [30, 60],
    outputRange: [1, 0],
  });
  const translateY = scrollAnimation.interpolate({
    inputRange: [30, 60],
    outputRange: [0, -60],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      <AnimatedSafeAreaView style={[styles.header, { shadowOpacity: 0 }]}>
        <HeaderButtons navigation={navigation} logout={logout} />
        <Animated.View
          style={[styles.innerHeader, { height: Platform.OS === "android" ? 120 : 80 }]}
        >
          <View>
            <AnimatedText
              type="header2"
              style={{
                fontSize: 36,

                marginTop: 24,
                color: "white",
                width: Dimensions.get("window").width * 0.9,
              }}
            >
              {title || "title"}
            </AnimatedText>
            <AnimatedSubHeaderTimeInterval filter={filter} updateFilter={updateFilter} />
          </View>
          <TouchableOpacity onPress={logout} style={[styles.settings, { right: 60 }]}>
            <View>
              <Text style={{ color: "white" }}>{logout_text}</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </AnimatedSafeAreaView>
      {showDetailHeader ? (
        <AnimatedSubHeader
          {...{ scrollAnimation, goals, refetch, updateSortOrder, sortOrder, updateFilter, filter }}
        />
      ) : null}
      {children}
    </View>
  );
};
const main_background = "#F17355"; //E0E5EC //"#17355A" //"#F17355"

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
    // borderTopLeftRadius: 25,
    // borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  innerHeader: {
    marginHorizontal: Theme.spacing.base,
    marginVertical: Theme.spacing.tiny,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
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
});
export default AnimatedHeader;
