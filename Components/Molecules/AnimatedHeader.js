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

const AnimatedHeader = ({ title, sub_title, logout, logout_text, scrollAnimation }) => {
  const transformHeight = {
    transform: [
      {
        scaleY: scrollAnimation.interpolate({
          inputRange: [30, 60],
          outputRange: [1, 0.9],
          extrapolate: "clamp",
        }),
        translateY: scrollAnimation.interpolate({
          inputRange: [30, 60],
          outputRange: [0, -60],
          extrapolate: "clamp",
        }),
      },
    ],
  };
  // const transformHeight = {
  //   transform: [
  //     {
  //       scaleY: 1,
  //     },
  //   ],
  // };

  const transformY = {
    transform: [
      {
        translateY: 0,
      },
    ],
  };
  return (
    <AnimatedSafeAreaView style={[styles.header, { shadowOpacity: 0 }, transformHeight]}>
      <Animated.View style={[styles.innerHeader]}>
        <View>
          <AnimatedText
            type="large"
            style={{ position: "absolute", top: 0, opacity: 1, transformY }}
          >
            {sub_title || ""}
          </AnimatedText>
          <Animated.Text
            style={{
              fontSize: 36,
              marginTop: 24,
            }}
          >
            {title || "title"}
          </Animated.Text>
        </View>
        <TouchableOpacity onPress={logout} style={styles.settings}>
          <View>
            <Text style={{ color: "white" }}>{logout_text}</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </AnimatedSafeAreaView>
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
