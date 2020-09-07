import React, { useState, useEffect, Fragment } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Modal,
  TouchableHighlight,
  Text,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Constants from "expo-constants";

const SettingsModal = ({ modalVisible, setModalVisible, logout }) => {
  return (
    <SafeAreaView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalTitle}>
              <TouchableWithoutFeedback
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <AntDesign name="close" size={24} color="black" />
              </TouchableWithoutFeedback>
              <Text style={styles.modalText}>Settings</Text>
            </View>
            <View style={styles.logout}>
              <TouchableHighlight
                style={{ ...styles.openButton }}
                onPress={() => {
                  logout();
                }}
              >
                <Text style={styles.textStyle}>Logout</Text>
              </TouchableHighlight>
            </View>

            <View style={styles.versionTitle}>
              <Text style={styles.versionText}>Version 364</Text>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: Constants.statusBarHeight,
    flexDirection: "column",
  },
  modalTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalView: {
    margin: 0,
    height: height,
    width: width * 0.5,
    backgroundColor: "white",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logout: { flexDirection: "column", justifyContent: "flex-end" },
  openButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  modalText: {
    fontSize: 26,
    marginLeft: 10,
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  versionText: {
    fontSize: 14,
    marginLeft: 10,
    marginBottom: 15,
    textAlign: "center",
    color: "gray",
  },
  versionTitle: {
    flexDirection: "column",
    // alignSelf: "flex-end",
    justifyContent: "space-between",
  },
});

export default SettingsModal;
