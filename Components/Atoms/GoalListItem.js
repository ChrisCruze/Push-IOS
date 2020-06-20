import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Dimensions,
  Animated,
  Alert,
} from "react-native";
import { Neomorph } from "react-native-neomorph-shadows";
import { SwipeRow } from "react-native-swipe-list-view";
import { Feather as Icon } from "@expo/vector-icons";

const GoalButtonBackDashboard = ({ pushGoal }) => {
  return (
    <View
      style={{
        ...styles.backButton,
        backgroundColor: "#005AFF",
        flex: 1,
        borderRadius: 18,
        flexDirection: "row",
        paddingLeft: 25,
        justifyContent: "flex-start",
      }}
    >
      <TouchableWithoutFeedback onPress={pushGoal}>
        <Icon name="check" size={30} color={"white"} />
      </TouchableWithoutFeedback>
    </View>
  );
};

const GoalButtonBackDelete = ({ goalName, deleteGoal, navigateToGoal }) => {
  const deleteWithConfirmation = () => {
    Alert.alert(
      "Are you sure you want to delete?",
      goalName,
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => console.log("Goal Delete Cancelled"),
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
    <View
      style={{
        ...styles.backButton,
        backgroundColor: "#000000",
        flex: 1,
        borderRadius: 18,
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "flex-end",
      }}
    >
      <TouchableWithoutFeedback onPress={navigateToGoal}>
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

const GoalButtonBack = ({ goalName, deleteGoal, navigateToGoal, pushGoal }) => {
  return (
    <View style={[styles.standaloneRowBack]}>
      <GoalButtonBackDashboard pushGoal={pushGoal} />
      <GoalButtonBackDelete
        goalName={goalName}
        deleteGoal={deleteGoal}
        navigateToGoal={navigateToGoal}
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
  pushGoal,
  lastTimeStampMessage,
  is_overdue,
}) => {
  const [fadeAnim] = useState(new Animated.Value(1));
  const [moveAnim] = useState(new Animated.Value(0));

  const color = "#17355A"; //"#2DAAFF"; //is_overdue ? "red" : "green";
  const color_shade = is_overdue ? "#C94818" : "#193162";

  const pushGoalAnimate = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 100,
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
        pushGoal();
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1500,
        }).start();
      });
    });
  };

  return (
    <TouchableWithoutFeedback onPress={pushGoalAnimate}>
      <Neomorph darkShadowColor={color_shade} lightShadowColor="#FFF" style={styles.neomorph}>
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
  pushGoal,
  totalCount,
  cadence,
  cadenceCount,
  deleteGoal,
  lastTimeStampMessage,
  is_overdue,
}) => {
  // const onSwipeValueChange = swipeData => {
  //   const { value } = swipeData;
  //   if (value > Dimensions.get("window").width) {
  //     Animated.timing(new Animated.Value(0), {
  //       toValue: 0,
  //       duration: 200,
  //     }).start(() => {
  //       navigateToGoal();
  //     });
  //   }
  // };

  return (
    <View style={styles.container}>
      <View style={styles.standalone}>
        <SwipeRow
          leftActionValue={80} // the exposed length when swiped
          rightActionValue={-80}
          leftActivationValue={60} // how far the swipe needs to be to open
          rightActivationValue={-60}
          directionalDistanceChangeThreshold={1} // swipe sensitivity
          closeOnRowPress={true}
          stopLeftSwipe={110} // limits back button expose length
          stopRightSwipe={-110}
        >
          <GoalButtonBack
            deleteGoal={deleteGoal}
            navigateToGoal={navigateToGoal}
            pushGoal={pushGoal}
            goalName={text}
          />
          <GoalButtonFront
            text={text}
            totalCount={totalCount}
            cadence={cadence}
            cadenceCount={cadenceCount}
            pushGoal={pushGoal}
            lastTimeStampMessage={lastTimeStampMessage}
            is_overdue={is_overdue}
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
    // padding: 15,
    height: 95,
    // borderWidth: 1,
    // borderColor: "#005AFF",
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
    shadowOpacity: 0.7, // <- and this or yours opacity
    shadowRadius: 4,
    borderRadius: 18,
    borderColor: "#000000",
    backgroundColor: "#FFF9FD", //"#0070c0", //89CFF0"#ECF0F3",
    width: width * 0.8,
    height: 95,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: Platform.OS === "android" ? 4 : 2,
  },
  task: {
    fontWeight: "bold",
    color: "#17355A",
    flex: 1,
    fontSize: 28,
  },
  duration: {
    color: "#17355A",
    fontSize: 12,
    textAlign: "justify",
  },
  frequency: {
    flex: 1,
    color: "#17355A",
    fontSize: 32,
    textAlign: "right",
  },
  topRow: {
    width: 250,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 10,
    flexDirection: "row",
    flex: 2,
    alignSelf: "stretch",
    textAlign: "left",
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
  backButton: {
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
  },
});
