import React, { useState, useRef, useEffect } from "react";
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
import LoadingIndicator from "./LoadingIndicator";

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

const GoalTitleText = ({ text, color, textDecorationLine }) => {
  const textLength = text.length;
  const fontSizeCalculated = GoalTitleTextFontSizeDetermine(textLength, text);
  return (
    <Text
      style={[
        styles.task,
        {
          fontSize: fontSizeCalculated,
          color,
          textDecorationLine,
        },
      ]}
    >
      {text}
    </Text>
  );
};

const GoalButtonFrontBase = ({
  text,
  subTitle,
  totalCount,
  cadenceCount,
  cadence,
  lastTimeStampMessage,
  moveAnim,
  fadeAnim,
  navigateToGoal,
  rowOpen,
  closeRow,
  backgroundColor,
  color,
  borderColor,
  opacity,
  textDecorationLine,
  is_loading,
}) => {
  const neomorph = {
    shadowOpacity: 0.7,
    shadowRadius: 4,
    borderRadius: 18,
    borderColor: borderColor,
    backgroundColor: backgroundColor,
    width: width * 0.8,
    height: 95,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: Platform.OS === "android" ? 4 : 2,
  };
  return (
    <TouchableWithoutFeedback onPress={rowOpen ? closeRow : navigateToGoal}>
      <Neomorph lightShadowColor="#FFF" style={neomorph}>
        <View style={[styles.topRow, { opacity }]}>
          <GoalTitleText text={text} color={color} textDecorationLine={textDecorationLine} />
          <View style={[styles.dash, { borderColor: color }]}>
            <Animated.Text
              style={[
                styles.frequency,
                { textDecorationColor: color, color: color, opacity: fadeAnim, bottom: moveAnim },
              ]}
            >
              {is_loading ? <LoadingIndicator /> : calculatePercentage(totalCount, cadenceCount)}
            </Animated.Text>
          </View>
        </View>
        <View style={[styles.botRow, { opacity }]}>
          <Text style={[styles.duration, { color }]}>{lastTimeStampMessage}</Text>
          <Text style={[styles.duration, { color }]}>{subTitle}</Text>
        </View>
      </Neomorph>
    </TouchableWithoutFeedback>
  );
};
const GoalButtonFront = ({
  text,
  subTitle,
  totalCount,
  cadenceCount,
  cadence,
  lastTimeStampMessage,
  moveAnim,
  fadeAnim,
  navigateToGoal,
  rowOpen,
  closeRow,
  is_overdue,
  is_loading,
}) => {
  const backgroundColor = is_overdue ? "#FFF9FD" : "#D3D5DA";
  const color = "black";
  const borderColor = is_overdue ? "#000000" : "#D3D5DA";
  const opacity = is_overdue ? 1 : 0.7;
  const textDecorationLine = "none";
  return (
    <GoalButtonFrontBase
      {...{
        text,
        subTitle,
        totalCount,
        cadenceCount,
        cadence,
        lastTimeStampMessage,
        moveAnim,
        fadeAnim,
        navigateToGoal,
        rowOpen,
        closeRow,
        backgroundColor,
        color,
        borderColor,
        opacity,
        textDecorationLine,
        is_loading,
      }}
    />
  );
};

const pushGoalAnimation = ({ fadeAnim, updateIsLoading, pushGoal }) => {
  Animated.timing(fadeAnim, {
    toValue: 0,
    duration: 500,
  }).start(() => {
    new Promise((resolve, reject) => {
      updateIsLoading(true);
      resolve();
    })
      .then(() => {
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
        }).start(() => {
          pushGoal().then(() => {
            Animated.timing(fadeAnim, {
              toValue: 0,
              duration: 500,
            })
              .start(() => {
                updateIsLoading(false);
              })
              .then(() => {
                Animated.timing(fadeAnim, {
                  toValue: 1,
                  duration: 500,
                }).start();
              })
              .catch(e => console.error(e));
          });
        });
      })
      .catch(e => console.error(e));
  });
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
  subTitle,
}) => {
  const refToSwipeRow = useRef();
  const [fadeAnim] = useState(new Animated.Value(1));
  const [moveAnim] = useState(new Animated.Value(0));
  const [opacityAnim] = useState(new Animated.Value(0));
  const [is_loading, updateIsLoading] = useState(false);

  const pushGoalAnimate = () => {
    pushGoalAnimation({ fadeAnim, updateIsLoading, pushGoal });
  };
  const [rowOpen, setRowOpen] = useState(false);
  useEffect(() => {
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 2000,
    }).start();
  }, []);
  return (
    <Animated.View style={[styles.container, { opacity: opacityAnim }]}>
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
            pushGoal={pushGoalAnimate}
            goalName={text}
            closeRow={() => refToSwipeRow.current.closeRow()}
            pushGoalAnimate={() => {}}
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
            subTitle={subTitle}
            is_loading={is_loading}
          />
        </SwipeRow>
      </View>
    </Animated.View>
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
