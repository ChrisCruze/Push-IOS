import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  SafeAreaView,
  Dimensions,
} from "react-native";
import Constants from "expo-constants";
import { Ionicons as Icon } from "@expo/vector-icons";
import { CarouselMetrics } from "./CarouselMetrics";
import MetricNeomorph from "./MetricNeomorph";

const ModalIcon = () => (
  <View style={styles.iconView}>
    <View style={styles.iconWrapperWrapper}>
      <View style={styles.iconWrapper}>
        <Icon name={"ios-star"} size={80} color={"#FFD75B"} backgroundColor={"#FFD75B"} />
      </View>
    </View>
  </View>
);

const PushCount = ({ time_stamp_count }) => {
  return <MetricNeomorph number={time_stamp_count} text={"Pushes"} />;
};

const StreakCount = ({ streakCount }) => {
  return <MetricNeomorph number={streakCount} text={"Streak"} />;
};

const ModalCarousel = ({ time_stamp_count, streakCount }) => {
  return (
    <CarouselMetrics
      style="stats"
      itemsPerInterval={2}
      items={[
        <PushCount time_stamp_count={time_stamp_count} />,
        <StreakCount streakCount={streakCount} />,
      ]}
    />
  );
};

const NotificationsModal = ({ modalState, setModalState }) => {
  return (
    <SafeAreaView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalState.visible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalState.text}</Text>
            <ModalIcon />
            <ModalCarousel {...modalState} />
            <View style={styles.buttonWrapper}>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#005AFF" }}
                onPress={() => {
                  setModalState({ ...modalState, visible: !modalState.visible });
                }}
              >
                <Text style={styles.textStyle}>Done</Text>
              </TouchableHighlight>
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
    justifyContent: "center",
    alignItems: "center",
    marginTop: Constants.statusBarHeight,
  },
  modalView: {
    height: height * 0.65,
    width: width * 0.8,
    margin: 50,
    backgroundColor: "white",
    borderRadius: 20,
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
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    fontSize: 20,
    fontWeight: "bold",

    textAlign: "center",
  },
  iconWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#005AFF",
    justifyContent: "center",
    alignItems: "center",
  },
  iconWrapperWrapper: {
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
    backgroundColor: "#005AFF",
    padding: 10,
  },
  iconView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonWrapper: {
    padding: 20,
  },
});

export default NotificationsModal;
