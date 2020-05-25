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
} from "react-native";
import Constants from "expo-constants";
import { TextClass } from "../Atoms/Text";
import Theme from "../Atoms/Theme";
import { DataFlattenConvertGoals, determineOverDue } from "../Atoms/BarChart.functions";
import { Feather as Icon, Ionicons, FontAwesome } from "@expo/vector-icons";

const AnimatedText = Animated.createAnimatedComponent(TextClass);
const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

const AnimatedSubHeaderMetrics = ({ goals }) => {
  const number_of_goals = goals.length;
  const number_of_pushes = DataFlattenConvertGoals(goals).length;
  const completed_count = goals.filter(function(D) {
    return determineOverDue({ ...D, goals });
  }).length;
  const complete_percentage = ((completed_count / number_of_goals) * 100).toFixed(0);
  return (
    <Fragment>
      <View>
        <AnimatedText type="large">{number_of_goals + " Goals"}</AnimatedText>
      </View>
      <View>
        <AnimatedText type="large">{number_of_pushes + " Pushes"}</AnimatedText>
      </View>
      <View>
        <AnimatedText type="large">{complete_percentage + " %"}</AnimatedText>
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

const AnimatedSubHeader = ({ scrollAnimation, goals, updateSortOrder, sortOrder }) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const transformOpacity = scrollAnimation.interpolate({
    inputRange: [0, 60],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const transformY = scrollAnimation.interpolate({
    inputRange: [0, 60],
    outputRange: [0, -30],
    extrapolate: "clamp",
  });

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 1000 }).start();
  }, []);

  return (
    <AnimatedSafeAreaView
      style={[
        styles.subheader,
        { opacity: transformOpacity, transform: [{ translateY: transformY }] }, //translateY: transformY
      ]}
    >
      <Animated.View style={[styles.innerSubHeader, { opacity: fadeAnim }]}>
        <AnimatedSubHeaderSort sortOrder={sortOrder} updateSortOrder={updateSortOrder} />
        <AnimatedSubHeaderMetrics goals={goals} />
      </Animated.View>
    </AnimatedSafeAreaView>
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
}) => {
  const [scrollAnimation] = React.useState(new Animated.Value(0));
  const [showDetailHeader, updateShowDetailHeader] = useState(false);
  scrollAnimation.addListener(({ value }) => {
    if (value < 0) {
      updateShowDetailHeader(true);
    } else if (value > 100) {
      updateShowDetailHeader(false);
    }
  });

  return (
    <View style={styles.container}>
      <AnimatedSafeAreaView style={[styles.header, { shadowOpacity: 0 }]}>
        <Animated.View
          style={[styles.innerHeader, { height: Platform.OS === "android" ? 70 : 80 }]}
        >
          <View>
            <AnimatedText
              type="large"
              style={{ position: "absolute", top: 0, opacity: 1, transform: [{ translateY: 0 }] }}
            >
              {sub_title || ""}
            </AnimatedText>

            <AnimatedText type="header2" style={{ fontSize: 36, marginTop: 24 }}>
              {title || "title"}
            </AnimatedText>
          </View>

          <TouchableOpacity onPress={logout} style={styles.settings}>
            <View>
              <Text style={{ color: "white" }}>{logout_text}</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </AnimatedSafeAreaView>
      {showDetailHeader ? (
        <AnimatedSubHeader {...{ scrollAnimation, goals, refetch, updateSortOrder, sortOrder }} />
      ) : null}
      <Animated.ScrollView
        style={styles.scrollView}
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { y: scrollAnimation } },
            },
          ],
          {
            useNativeDriver: true,
          },
        )}
      >
        {children}
      </Animated.ScrollView>
    </View>
  );
};
const main_background = "#F17355"; //E0E5EC //"#17355A" //"#F17355"

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subheader: {
    backgroundColor: Theme.palette.background, // Theme.palette.background, //"white",
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
    backgroundColor: main_background, //"white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 8,
    zIndex: 10000,
  },
  innerHeader: {
    marginHorizontal: Theme.spacing.base,
    marginVertical: Theme.spacing.tiny,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
export default AnimatedHeader;