import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
  Dimensions,
  Animated,
} from "react-native";
import { Neomorph } from "react-native-neomorph-shadows";
import { SwipeListView, SwipeRow } from "react-native-swipe-list-view";
import { Feather as Icon, Ionicons, FontAwesome } from "@expo/vector-icons";
import AwesomeButton from "react-native-really-awesome-button";
import AwesomeButtonRick from "react-native-really-awesome-button/src/themes/rick";
import AwesomeButtonProgress from "react-native-really-awesome-button";

const GoalButtonBackDelete = ({ deleteGoal }) => {
  return (
    <TouchableWithoutFeedback onPress={deleteGoal}>
      <Icon name="trash" size={45} {...{ color: "black" }} />

      {/* <Text style={[styles.buttonText]}>Delete</Text> */}
    </TouchableWithoutFeedback>
  );
};
const GoalButtonBackDashboard = ({ navigateToGoal }) => {
  return (
    <TouchableWithoutFeedback onPress={navigateToGoal}>
      <FontAwesome name="dashboard" size={45} {...{ color: "black" }} />
      {/* <Text style={[styles.buttonText]}>Dashboard</Text> */}
    </TouchableWithoutFeedback>
  );
};

const GoalButtonBack = ({ deleteGoal, navigateToGoal }) => {
  return (
    <View style={[styles.standaloneRowBack]}>
      <GoalButtonBackDashboard navigateToGoal={navigateToGoal} />

      <GoalButtonBackDelete deleteGoal={deleteGoal} />
    </View>
  );
};

const GoalButtonFrontOLD = ({ text, totalCount, pushGoal, lastTimeStampMessage, is_overdue }) => {
  const color = "#17355A"; //"#2DAAFF"; //is_overdue ? "red" : "green";
  const color_shade = is_overdue ? "#C94818" : "#193162";

  return (
    <TouchableWithoutFeedback onPress={pushGoal}>
      <Neomorph
        darkShadowColor={color_shade} //"#D1CDC7" // <- set this
        lightShadowColor="#FFF" //{color_shade} ///
        style={styles.neomorph}
      >
        <View style={styles.topRow}>
          <Text style={styles.task}>{text}</Text>
          <View style={[styles.dash, { borderColor: color }]}>
            <Text style={[styles.frequency, { textDecorationColor: color, color: color }]}>
              {totalCount}
            </Text>
          </View>
        </View>
        <View style={styles.botRow}>
          <Text style={styles.duration}>Last Updated: {lastTimeStampMessage}</Text>
        </View>
      </Neomorph>
    </TouchableWithoutFeedback>
  );
};
const GoalButtonFront = ({ text, totalCount, cadence, pushGoal, lastTimeStampMessage, is_overdue }) => {
  const color = "#17355A"; //"#2DAAFF"; //is_overdue ? "red" : "green";
  const color_shade = is_overdue ? "#C94818" : "#193162";
  const main_background = "#FFF9FD";
  return (
    <TouchableWithoutFeedback onPress={pushGoal}>
      <AwesomeButtonProgress
        progress
        height={115}
        activityColor={main_background}
        backgroundColor={main_background}
        backgroundShadow={main_background}
        backgroundDarker={main_background}
        backgroundPlaceholder={main_background}
        backgroundActive={main_background} //"#C0C0C0"}
        backgroundProgress={main_background}
        activeOpacity={70}
        borderColor={main_background}
        progressLoadingTime={10000}
        width={Dimensions.get("window").width * 85}
        raiseLevel={0}
        action={(element, next) => doSomethingThenCall(next)}
        onPress={next => {
          pushGoal();
          next();
        }}
      >
        <Neomorph
          darkShadowColor={color_shade} //"#D1CDC7" // <- set this
          lightShadowColor="#FFF" //{color_shade} ///
          style={styles.neomorph}
        >
          <View style={styles.topRow}>
            <Text style={styles.task}>{text}</Text>
            <View style={[styles.dash, { borderColor: color }]}>
              <Text style={[styles.frequency, { textDecorationColor: color, color: color }]}>
                {totalCount}/{cadence}
              </Text>
            </View>
          </View>
          <View style={styles.botRow}>
            <Text style={styles.duration}>Last Updated: {lastTimeStampMessage}</Text>
          </View>
        </Neomorph>
      </AwesomeButtonProgress>
    </TouchableWithoutFeedback>

    // <AwesomeButton progress width={Dimensions.get("window") * 0.8} height={95}>
    //   {/* <Image source="require('send-icon.png)" /> */}
    //   {/* <Text>Send it</Text> */}

    //   <Neomorph
    //     darkShadowColor={color_shade} //"#D1CDC7" // <- set this
    //     lightShadowColor="#FFF" //{color_shade} ///
    //     style={styles.neomorph}
    //   >
    //     <View style={styles.topRow}>
    //       <Text style={styles.task}>{text}</Text>
    //       <View style={[styles.dash, { borderColor: color }]}>
    //         <Text style={[styles.frequency, { textDecorationColor: color, color: color }]}>
    //           {totalCount}
    //         </Text>
    //       </View>
    //     </View>
    //     <View style={styles.botRow}>
    //       <Text style={styles.duration}>Last Updated: {lastTimeStampMessage}</Text>
    //     </View>
    //   </Neomorph>

    // </AwesomeButton>
  );
};
const GoalListItem = ({
  text,
  navigateToGoal,
  pushGoal,
  totalCount,
  cadence,
  deleteGoal,
  lastTimeStampMessage,
  is_overdue,
}) => {
  const onSwipeValueChange = swipeData => {
    const { key, value } = swipeData;
    if (value > Dimensions.get("window").width) {
      Animated.timing(new Animated.Value(0), {
        toValue: 0,
        duration: 200,
      }).start(() => {
        navigateToGoal();
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.standalone}>
        <SwipeRow
          // disableRightSwipe
          rightOpenValue={Dimensions.get("window").width}
          onSwipeValueChange={onSwipeValueChange}
        >
          <GoalButtonBack deleteGoal={deleteGoal} navigateToGoal={navigateToGoal} />
          <GoalButtonFront
            text={text}
            totalCount={totalCount}
            cadence={cadence}
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
    backgroundColor: main_background,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 20,
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
    shadowRadius: 7,
    borderRadius: 30,
    borderTopColor: "#FFF",
    borderLeftColor: "#FFF",
    borderBottomColor: "#D1CDC7",
    borderRightColor: "#D1CDC7",
    backgroundColor: "#FFF9FD", //"#0070c0", //89CFF0"#ECF0F3",
    width: width * 0.8,
    height: 95,
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 2,
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
    fontSize: 14,
    fontWeight: "bold",
    flex: 2,
    flexDirection: "row",
    alignSelf: "stretch",
    textAlign: "left",
  },
  dash: {
    borderBottomWidth: 3,
  },
  buttonText: {
    alignSelf: "center",
    fontSize: 32,
    fontWeight: "bold",
  },
});
