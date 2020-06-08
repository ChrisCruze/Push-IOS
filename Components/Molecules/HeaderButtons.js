import React, { useState, useEffect, Fragment } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Modal,
  TouchableHighlight,
  Text,
} from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import Theme from "../Atoms/Theme";
import SettingsModal from "../Atoms/SettingsModal";

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
          <Icon name={"list"} size={25} {...{ color: "white" }} />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate("Notifications");
          }}
        >
          <Icon name={"bell"} size={25} {...{ color: "white" }} />
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
  },
});

export default HeaderButtons;
