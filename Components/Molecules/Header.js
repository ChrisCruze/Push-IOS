import * as React from "react";
import { Text, StyleSheet, View, Animated, SafeAreaView, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import { TextClass } from "../Atoms/Text";
import Theme from "../Atoms/Theme";

const AnimatedText = Animated.createAnimatedComponent(TextClass);
const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

const Header = ({ title, sub_title, logout, logout_text }) => {
  return (
    <AnimatedSafeAreaView style={[styles.header, { shadowOpacity: 0 }]}>
      <Animated.View style={[styles.innerHeader, { height: Platform.OS === "android" ? 70 : 80 }]}>
        <View>
          <AnimatedText
            type="large"
            style={{ position: "absolute", top: 0, opacity: 1, transform: [{ translateY: 0 }] }}
          >
            {sub_title || ""}
          </AnimatedText>
          <AnimatedText type="header2" style={{ fontSize: 36, marginTop: 24, color: "white" }}>
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
    backgroundColor: "black",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 8,
    marginBottom: 20,
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
  settings: {
    color: "#FFFFFF",
  },
});
export default Header;
