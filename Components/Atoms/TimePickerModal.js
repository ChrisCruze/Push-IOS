import React, { useState, Fragment } from "react";
// import DatePicker from "react-native-date-picker";
import {
  View,
  Button,
  Platform,
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const TimePicker = ({ modalVisible, setModalVisible, date, setDate, saveTimeStamp }) => {
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <View style={styles.pickers}>
                <DateTimePicker
                  style={styles.picker}
                  testID="dateTimePicker"
                  value={date}
                  mode={"datetime"}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
                {/* <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={"time"}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                /> */}
              </View>
            </View>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
                saveTimeStamp();
              }}
            >
              <Text style={styles.textStyle}>Submit</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  picker: {
    width: Dimensions.get("window").width,
  },
  // pickers: { flexDirection: "row", justifyContent: "center" },
  modalView: {
    margin: 20,
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
    textAlign: "center",
  },
});

export default TimePicker;
