import * as React from "react";
import { StyleSheet, TouchableWithoutFeedback, SafeAreaView, View, Dimensions } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import Theme from "../Atoms/Theme";
import { Neomorph } from "react-native-neomorph-shadows";

const HomeTabButtonActive = ({ info }) => {
  const color = "white";

  return (
    <View style={[styles.tabButton, { backgroundColor: "black" }]}>
      <Icon name={info.icon} size={30} {...{ color }} />
    </View>
  );
};

const HomeTabButtonInactive = ({ info }) => {
  const color = "black";
  return (
    <Neomorph
      // darkShadowColor={"#D1CDC7"} //"#D1CDC7" // <- set this
      lightShadowColor="#FFF"
      // inner // <- enable shadow inside of neomorph
      // swapShadows // <- change zIndex of each shadow color
      style={{
        alignItems: "center",
        justifyContent: "center",
        shadowRadius: 10,
        borderRadius: 12,
        backgroundColor: "#DDDDDD",
        width: 50,
        height: 50,

        // darkShadowColor="#D1CDC7", //"#D1CDC7" // <- set this
        // lightShadowColor="#FFF" ,//{color_shade} ///
        shadowOpacity: 0.7, // <- and this or yours opacity
        shadowRadius: 7,
        borderTopColor: "#FFF",
        borderLeftColor: "#FFF",
        borderBottomColor: "#D1CDC7",
        borderRightColor: "#D1CDC7",
        backgroundColor: "#FFF9FD",
      }}
    >
      <Icon name={info.icon} size={30} {...{ color }} />
    </Neomorph>

    // <View style={[styles.tabButton, { backgroundColor: "white" }]}>
    //   <Icon name={info.icon} size={30} {...{ color }} />
    // </View>
  );
};
const HomeTabButton = ({ i, current, info }) => {
  if (i === current) {
    return <HomeTabButtonActive info={info} />;
  } else {
    return <HomeTabButtonInactive info={info} />;
  }
};

const HomeTab = ({ navigation }) => {
  const navigate = i => navigation.navigate(i);
  const tabs = [
    { label: "Dashboard", icon: "bar-chart" },
    { label: "createGoal", icon: "plus-circle" },
    { label: "Goals", icon: "list" },
  ];
  const navState = navigation.state;
  const current = navState.index;

  return (
    <SafeAreaView style={styles.tabs}>
      <View style={styles.container}>
        {tabs.map((info, i) => {
          const color = "white";
          return (
            <TouchableWithoutFeedback
              key={info.label}
              onPress={() => (i !== current ? navigate(info.label) : null)}
            >
              <View style={styles.tab}>
                <HomeTabButton i={i} current={current} info={info} />
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </SafeAreaView>
  );
};
const { width, height } = Dimensions.get("window");
console.log({ width, height });
const styles = StyleSheet.create({
  tabButton: {
    borderRadius: 12,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  tabs: {
    backgroundColor: "white", //"#FFF9FD",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 8,
  },
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    height: 60, //0.08 * height, //57
  },
  tab: {
    flexGrow: 1,
    height: 60, //0.08 * height, //57
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeTab;
