import * as React from "react";
import { StyleSheet, TouchableWithoutFeedback, SafeAreaView, View } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import Theme from "../Atoms/Theme";

const HomeTab = ({ navigation }) => {
  const navigate = i => navigation.navigate(i);
  const tabs = [
    // { label: "Profile", icon: "home" },
    { label: "Dashboard", icon: "bar-chart" },
    { label: "Goals", icon: "list" },
  ];
  const navState = navigation.state;
  const current = navState.index;

  return (
    <SafeAreaView style={styles.tabs}>
      <View style={styles.container}>
        {tabs.map((info, i) => {
          const color = i === current ? Theme.palette.primary : Theme.palette.lightGray;
          return (
            <TouchableWithoutFeedback
              key={info.label}
              onPress={() => (i !== current ? navigate(info.label) : null)}
            >
              <View style={styles.tab}>
                <Icon name={info.icon} size={25} {...{ color }} />
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tabs: {
    backgroundColor: "white",
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
    height: 57,
  },
  tab: {
    flexGrow: 1,
    height: 57,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeTab;
