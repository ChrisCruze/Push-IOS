import React, { Fragment } from "react";
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
        <Icon name={"ios-star"} size={90} color={"#FFD75B"} backgroundColor={"#FFD75B"} />
      </View>
    </View>
  </View>
);

const ModalCarousel = ({ time_stamp_count, streakCount, longest_streak }) => {
  return (
    <View style={styles.metricsContainer}>
      <CarouselMetrics
        style="stats"
        itemsPerInterval={3}
        items={[
          <MetricNeomorph number={time_stamp_count} text={"Pushes"} />,
          <MetricNeomorph number={streakCount} text={"Current Streak"} />,
          <MetricNeomorph number={longest_streak} text={"Longest Streak"} />,
          <MetricNeomorph number={time_stamp_count} text={"Pushes"} />,
        ]}
      />
    </View>
  );
};

const ModalButtons = ({ modalState, setModalState }) => (
  <View style={styles.buttonWrapper}>
    <TouchableHighlight
      style={{ ...styles.openButton, backgroundColor: "#005AFF" }}
      onPress={() => {
        modalState.navigateToGoal();
        setModalState({ ...modalState, visible: !modalState.visible });
      }}
    >
      <Text style={styles.textStyle}>Dashboard</Text>
    </TouchableHighlight>
    <TouchableHighlight
      style={{ ...styles.openButton, backgroundColor: "#005AFF" }}
      onPress={() => {
        setModalState({ ...modalState, visible: !modalState.visible });
      }}
    >
      <Text style={styles.textStyle}>Close</Text>
    </TouchableHighlight>
  </View>
);
const ModalText = ({ modalState }) => (
  <Fragment>
    <Text style={styles.modalTitle}>{modalState.title}</Text>
    <Text style={styles.modalText}>{modalState.text}</Text>
  </Fragment>
);

const NotificationsModal = ({ modalState, setModalState }) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalState.visible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        {/* <View style={styles.centeredView}> */}
        <View style={styles.modalView}>
          <ModalText modalState={modalState} />
          <ModalIcon />
          <ModalButtons modalState={modalState} setModalState={setModalState} />
          {/* <ModalCarousel {...modalState} /> */}
        </View>
        {/* </View> */}
      </Modal>
    </View>
  );
};
const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  modalView: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "white",
    justifyContent: "center",
    padding: 35,
    borderRadius: 20,
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
    width: 100,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  modalTitle: {
    marginBottom: 5,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  modalText: {
    marginBottom: 30,
    fontSize: 15,
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
    // flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    padding: 30,
  },
  buttonWrapper: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  metricsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
    textAlign: "center",
  },
});

export default NotificationsModal;
