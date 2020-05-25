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
  TouchableWithoutFeedback,
} from "react-native";
import Constants from "expo-constants";
import { TextClass } from "../Atoms/Text";
import Theme from "../Atoms/Theme";
import { DataFlattenConvertGoals, determineOverDue } from "../Atoms/BarChart.functions";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const AnimatedText = Animated.createAnimatedComponent(TextClass);
const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

const AnimatedSubHeader = ({ scrollAnimation, goals, updateSortOrder, sortOrder }) => {
  const number_of_goals = goals.length;
  const number_of_pushes = DataFlattenConvertGoals(goals).length;
  const completed_count = goals.filter(function(D) {
    return determineOverDue({ ...D, goals });
  }).length;
  const complete_percentage = ((completed_count / number_of_goals) * 100).toFixed(0);

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

  return (
    <AnimatedSafeAreaView
      style={[
        styles.subheader,
        { opacity: transformOpacity, transform: [{ translateY: transformY }] },
      ]} //, scaleY: 1
    >
      <Animated.View style={[styles.innerSubHeader]}>
        <TouchableWithoutFeedback
          onPress={() => {
            console.log({ sortOrder });
            updateSortOrder(sortOrder == "asc" ? "desc" : "asc");
          }}
        >
          <View>
            <AnimatedText type="large">Sort</AnimatedText>
          </View>
        </TouchableWithoutFeedback>
        <View>
          <AnimatedText type="large">{number_of_goals + " Goals"}</AnimatedText>
        </View>
        <View>
          <AnimatedText type="large">{number_of_pushes + " Pushes"}</AnimatedText>
        </View>
        <View>
          <AnimatedText type="large">{complete_percentage + " %"}</AnimatedText>
        </View>
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

  return (
    <View style={styles.container}>
      <AnimatedSafeAreaView style={[styles.header, { shadowOpacity: 0 }]}>
        <Animated.View style={[styles.innerHeader, { height: 100 }]}>
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
      <AnimatedSubHeader {...{ scrollAnimation, goals, refetch, updateSortOrder, sortOrder }} />

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
  RefreshIndicator: {
    ...StyleSheet.absoluteFillObject,
    paddingTop: Constants.statusBarHeight + 100 + Theme.spacing.base,
  },
  subheader: {
    backgroundColor: main_background, // Theme.palette.background, //"white",
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
  list: {
    paddingHorizontal: Theme.spacing.small,
  },
});
export default AnimatedHeader;
