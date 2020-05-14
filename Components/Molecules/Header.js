import * as React from "react";
import moment from "moment";
import {
  FlatList,
  StyleSheet,
  View,
  Animated,
  SafeAreaView,
  RefreshControl,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import { TextClass } from "../Atoms/Text";
import Theme from "../Atoms/Theme";
import { Text as RNText } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const AnimatedText = Animated.createAnimatedComponent(TextClass);
const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

const Header = ({ title, sub_title, logout }) => {
  const [scrollAnimation, updateScrollAnimation] = React.useState(new Animated.Value(0));

  const start = 30;
  const opacity = scrollAnimation.interpolate({
    inputRange: [start, 60],
    outputRange: [1, 0],
  });
  const translateY = scrollAnimation.interpolate({
    inputRange: [start, 60],
    outputRange: [0, -60],
    extrapolate: "clamp",
  });
  const fontSize = scrollAnimation.interpolate({
    inputRange: [start, 60],
    outputRange: [36, 24],
    extrapolate: "clamp",
  });
  const height = scrollAnimation.interpolate({
    inputRange: [start, 60],
    outputRange: Platform.OS === "android" ? [70, 70] : [100, 60],
    extrapolate: "clamp",
  });
  const marginTop = scrollAnimation.interpolate({
    inputRange: [start, 60],
    outputRange: [24, 0],
    extrapolate: "clamp",
  });
  const shadowOpacity = scrollAnimation.interpolate({
    inputRange: [start, 60],
    outputRange: [0, 0.25],
    extrapolate: "clamp",
  });

  return (
    <AnimatedSafeAreaView style={[styles.header, { shadowOpacity }]}>
      <Animated.View style={[styles.innerHeader, { height }]}>
        <View>
          <AnimatedText
            type="large"
            style={{ position: "absolute", top: 0, opacity, transform: [{ translateY }] }}
          >
            {sub_title || "sub_title"}
          </AnimatedText>
          <AnimatedText type="header2" style={{ fontSize, marginTop }}>
            {title || "title"}
          </AnimatedText>
        </View>
        <TouchableOpacity onPress={logout} style={styles.settings}>
          <View>
            <Icon name="log-out" size={25} color="blue" />
          </View>
        </TouchableOpacity>
        {/* <TouchableWithoutFeedback onPress={this.profile}>
          <View>
            <Avatar {...profile.picture} />
          </View>
        </TouchableWithoutFeedback> */}
      </Animated.View>
    </AnimatedSafeAreaView>
  );
};
const main_background = "#FFF9FD"; //E0E5EC

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
export default Header;
