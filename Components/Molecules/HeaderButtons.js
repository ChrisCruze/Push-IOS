import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, TouchableWithoutFeedback } from "react-native";
import { AntDesign as Icon } from "@expo/vector-icons";
import Theme from "../Atoms/Theme";
import SettingsModal from "../Atoms/SettingsModal";
import Constants from "expo-constants";

const HeaderButtons = ({ navigation, logout }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={[]}>
      <SettingsModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        logout={logout}
      />
      <SafeAreaView style={[styles.innerHeader]}>
        <TouchableWithoutFeedback
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Icon name={"setting"} size={25} color={"white"} />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate("Notifications");
          }}
        >
          <Icon name={"bells"} size={25} color={"white"} />
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerInner: { flex: 1, height: 1000 },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "black",
  },
  controlText: {
    color: "white",
  },
  button: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
  },
  innerHeader: {
    marginHorizontal: Theme.spacing.base,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    marginBottom: 0,
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },
});

export default HeaderButtons;
