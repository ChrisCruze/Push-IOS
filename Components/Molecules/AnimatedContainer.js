import React, { useState, useEffect } from "react";
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
import AnimatedHeader from "./AnimatedHeader";
import AnimatedHeaderDetails from "./AnimatedHeaderDetails";

const AnimatedContainer = ({ title, sub_title, logout, logout_text, children }) => {
  const [scrollAnimation] = React.useState(new Animated.Value(0));
  const [showDetailHeader, updateShowDetailHeader] = useState(false);

  scrollAnimation.addListener(({ value }) => {
    console.log({ value });
    if (value < 0) {
      updateShowDetailHeader(true);
    } else if (value > 10) {
      updateShowDetailHeader(false);
    }
  });

  return (
    <View style={styles.container}>
      <AnimatedHeader {...{ title, sub_title, logout, logout_text, scrollAnimation }} />

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default AnimatedContainer;
