import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  FlatList,
  Text,
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

const HeaderPlaceholder = <View style={{ flex: 0, height: 200, width: "100%" }} />;
const AnimatedText = Animated.createAnimatedComponent(TextClass);
const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

const AnimatedHeader = ({ title, sub_title, logout, logout_text, children }) => {
  const [scrollY] = useState(new Animated.Value(0));

  const animationRange = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });
  const start = 30;

  const opacity = scrollY.interpolate({
    inputRange: [start, 60],
    outputRange: [1, 0],
  });
  const translateY = scrollY.interpolate({
    inputRange: [start, 60],
    outputRange: [0, -60],
    extrapolate: "clamp",
  });
  const fontSize = scrollY.interpolate({
    inputRange: [start, 60],
    outputRange: [36, 24],
    extrapolate: "clamp",
  });
  const height = scrollY.interpolate({
    inputRange: [start, 60],
    outputRange: Platform.OS === "android" ? [70, 70] : [100, 60],
    extrapolate: "clamp",
  });
  const marginTop = scrollY.interpolate({
    inputRange: [start, 60],
    outputRange: [24, 0],
    extrapolate: "clamp",
  });
  const shadowOpacity = scrollY.interpolate({
    inputRange: [start, 60],
    outputRange: [0, 0.25],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      <AnimatedSafeAreaView style={[styles.header]}>
        <Animated.View style={[styles.innerHeader]}>
          <View>
            <AnimatedText
              type="large"
              style={{ position: "absolute", top: 0, opacity, transform: [{ translateY }] }}
            >
              {sub_title || "sub_title"}
            </AnimatedText>
            <AnimatedText type="header2" style={{}}>
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
      <Animated.ScrollView
        style={styles.scrollView}
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { y: scrollY } },
            },
          ],
          {
            useNativeDriver: true,
          },
        )}
      >
        {/* {HeaderPlaceholder} */}
        {children}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    zIndex: 1,
  },
});

export default AnimatedHeader;
