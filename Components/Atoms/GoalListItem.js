import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Dimensions,
  Animated,
  Alert,
  Platform,
} from "react-native";
import { Neomorph } from "react-native-neomorph-shadows";
import { SwipeListView, SwipeRow } from "react-native-swipe-list-view";
import { Feather as Icon, Ionicons, FontAwesome } from "@expo/vector-icons";
import AwesomeButton from "react-native-really-awesome-button";
import AwesomeButtonRick from "react-native-really-awesome-button/src/themes/rick";
import AwesomeButtonProgress from "react-native-really-awesome-button";

const GoalButtonBackPushAction = ({ pushGoal, closeRow, pushGoalAnimate }) => {
  return (
    <View style={styles.backButtonLeft}>
      <TouchableWithoutFeedback
        onPress={() => {
          pushGoal();
          closeRow();
          pushGoalAnimate();
        }}
      >
        <Icon name="check" size={30} color={"white"} />
      </TouchableWithoutFeedback>
    </View>
  );
};

const GoalButtonBackDeleteAndEdit = ({ goalName, deleteGoal, navigateToEditGoal, closeRow }) => {
  const deleteWithConfirmation = () => {
    Alert.alert(
      "Are you sure you want to delete?",
      goalName,
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => closeRow(),
        },
        {
          text: "Delete",
          onPress: () => deleteGoal(),
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <View style={styles.backButtonRight}>
      <TouchableWithoutFeedback onPress={navigateToEditGoal}>
        <Icon name="edit-2" size={25} color={"white"} style={{ marginRight: 26 }} />
      </TouchableWithoutFeedback>
      <View
        style={{
          borderBottomColor: "white",
          borderBottomWidth: 2,
          width: 40,
          marginRight: 20,
        }}
      />
      <TouchableWithoutFeedback onPress={deleteWithConfirmation}>
        <Icon name="trash-2" size={25} color={"white"} style={{ marginRight: 26 }} />
      </TouchableWithoutFeedback>
    </View>
  );
};

const GoalButtonBack = ({
  closeRow,
  goalName,
  deleteGoal,
  navigateToEditGoal,
  pushGoal,
  pushGoalAnimate,
}) => {
  return (
    <View style={[styles.standaloneRowBack]}>
      <GoalButtonBackPushAction
        pushGoal={pushGoal}
        closeRow={closeRow}
        pushGoalAnimate={pushGoalAnimate}
      />
      <GoalButtonBackDeleteAndEdit
        closeRow={closeRow}
        goalName={goalName}
        deleteGoal={deleteGoal}
        navigateToEditGoal={navigateToEditGoal}
      />
    </View>
  );
};

const calculatePercentage = (totalCount, cadence) => {
  const percentage = totalCount / cadence;
  const percentageFormatted = (percentage * 100).toFixed(0);
  return percentageFormatted + "%";
};

const GoalTitleTextFontSizeDetermine = textLength => {
  if (textLength > 12) {
    const extraCharacters = Math.abs(textLength - 12);
    const fontSizeDetermined = 28 - extraCharacters;
    return fontSizeDetermined;
  } else {
    return 28;
  }
};

const GoalTitleText = ({ text }) => {
  const textLength = text.length;
  const fontSizeCalculated = GoalTitleTextFontSizeDetermine(textLength, text);
  return <Text style={[styles.task, { fontSize: fontSizeCalculated }]}>{text}</Text>;
};

const GoalButtonFront = ({
  text,
  totalCount,
  cadenceCount,
  cadence,
  lastTimeStampMessage,
  moveAnim,
  fadeAnim,
  navigateToGoal,
  rowOpen,
  closeRow,
}) => {
  const color = "#17355A";
  return (
    <TouchableWithoutFeedback onPress={rowOpen ? closeRow : navigateToGoal}>
      <Neomorph lightShadowColor="#FFF" style={styles.neomorph}>
        <View style={styles.topRow}>
          <GoalTitleText text={text} />
          <View style={[styles.dash, { borderColor: color }]}>
            <Animated.Text
              style={[
                styles.frequency,
                { textDecorationColor: color, color: color, opacity: fadeAnim, bottom: moveAnim },
              ]}
            >
              {calculatePercentage(totalCount, cadenceCount)}
            </Animated.Text>
          </View>
        </View>
        <View style={styles.botRow}>
          <Text style={styles.duration}>{lastTimeStampMessage}</Text>
          <Text style={styles.duration}>
            {totalCount} / {cadenceCount} ({cadence})
          </Text>
        </View>
      </Neomorph>
    </TouchableWithoutFeedback>
  );
};

const GoalListItem = ({
  text,
  navigateToGoal,
  navigateToEditGoal,
  pushGoal,
  totalCount,
  cadence,
  cadenceCount,
  deleteGoal,
  lastTimeStampMessage,
  is_overdue,
}) => {
  const refToSwipeRow = useRef();
  const [fadeAnim] = useState(new Animated.Value(1));
  const [moveAnim] = useState(new Animated.Value(0));

  const pushGoalAnimate = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
      }),
      Animated.timing(moveAnim, {
        toValue: 20,
        duration: 100,
      }),
    ]).start(() => {
      Animated.timing(moveAnim, {
        toValue: 0,
        duration: 0,
      }).start(() => {
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1500,
        }).start();
      });
    });
  };
  const [rowOpen, setRowOpen] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.standalone}>
        <SwipeRow
          leftActionValue={80} // the exposed length when swiped
          rightActionValue={-80}
          leftActivationValue={60} // how far the swipe needs to be to open
          rightActivationValue={-60}
          directionalDistanceChangeThreshold={1} // swipe sensitivity
          stopLeftSwipe={110} // limits back button expose length
          stopRightSwipe={-110}
          ref={refToSwipeRow}
          onRowOpen={() => setRowOpen(true)}
          onRowClose={() => setRowOpen(false)}
        >
          <GoalButtonBack
            deleteGoal={deleteGoal}
            pushGoal={pushGoal}
            goalName={text}
            closeRow={() => refToSwipeRow.current.closeRow()}
            pushGoalAnimate={pushGoalAnimate}
            navigateToEditGoal={navigateToEditGoal}
          />
          <GoalButtonFront
            text={text}
            totalCount={totalCount}
            cadence={cadence}
            cadenceCount={cadenceCount}
            lastTimeStampMessage={lastTimeStampMessage}
            is_overdue={is_overdue}
            navigateToGoal={navigateToGoal}
            moveAnim={moveAnim}
            fadeAnim={fadeAnim}
            closeRow={() => refToSwipeRow.current.closeRow()}
            rowOpen={rowOpen}
          />
        </SwipeRow>
      </View>
    </View>
  );
};

export default GoalListItem;

const { width } = Dimensions.get("window");
const main_background = "#FFF9FD";
const styles = StyleSheet.create({
  container: {
    backgroundColor: main_background,
    flex: 1,
  },
  standalone: {
    marginTop: 15,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  standaloneRow: {
    height: 120,
    width: width * 0.9,
    alignItems: "center",
  },
  standaloneRowBack: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 95,
  },
  textFont: {
    fontSize: 30,
  },
  backTextWhite: {
    color: "black",
  },
  spacer: {
    height: 50,
  },
  neomorph: {
    shadowOpacity: 0.7,
    shadowRadius: 4,
    borderRadius: 18,
    borderColor: "#000000",
    backgroundColor: "#FFF9FD",
    width: width * 0.8,
    height: 95,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: Platform.OS === "android" ? 4 : 2,
  },
  task: {
    fontWeight: "bold",
    color: "#17355A",
    flex: 2,
    fontSize: 28,
    alignContent: "flex-start",
    textAlign: "justify",
  },
  duration: {
    color: "#17355A",
    fontSize: 12,
    textAlign: "justify",
  },
  frequency: {
    flex: 1,
    alignSelf: "baseline",
    color: "#17355A",
    fontSize: 32,
    textAlign: "right",
    alignContent: "flex-end",
  },
  topRow: {
    width: 250,
    marginTop: 10,
    flexDirection: "row",
    flex: 2,
  },
  botRow: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 15,
    fontSize: 14,
    fontWeight: "bold",
    flex: 2,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  buttonText: {
    alignSelf: "center",
    fontSize: 32,
    fontWeight: "bold",
  },
  backButtonLeft: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#005AFF",
    flex: 1,
    borderRadius: 18,
    flexDirection: "row",
    paddingLeft: 25,
    justifyContent: "flex-start",
  },
  backButtonRight: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    display: "flex",
    alignItems: "flex-end",
    paddingLeft: 25,
    backgroundColor: "#000000",
    borderRadius: 18,
  },
});
