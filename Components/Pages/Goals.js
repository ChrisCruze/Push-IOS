import React, { useState, useEffect, useRef, Fragment } from "react";
import {
  AsyncStorage,
  View,
  Button,
  StyleSheet,
  Dimensions,
  Animated,
  FlatList,
  Vibration,
  Platform,
  Text,
} from "react-native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import Theme from "../Atoms/Theme";
import GoalItem from "../Molecules/GoalItem";
import { useGoalsPull, useGoalUpdate, useGoalDelete } from "../../API";
import { NavigationEvents } from "react-navigation";
import AnimatedHeader from "../Molecules/AnimatedHeader";
import Confetti from "../Molecules/Confetti";
import { GoalsSort, GoalsFilterState, GoalsFilterCadence } from "../Atoms/BarChart.functions";
import AnimatedLoading from "../Molecules/AnimatedLoading";
import NetworkCheckNav from "../Molecules/NetworkCheckNav";
import APIClient from "../../API";

import { NOTIFICATION_URI } from "react-native-dotenv";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const GoalsFilter = ({ goals }) => {
  const [filter, updateFilter] = useState({ state: "all", cadence: "all" });

  const filtered_state_goals = GoalsFilterState({ goals, state: filter.state });
  const filtered_cadence_goals = GoalsFilterCadence({
    goals: filtered_state_goals,
    cadence: filter.cadence,
  });
  return { filtered_goals: filtered_cadence_goals, updateFilter, filter };
};

const Goals = ({ navigation }) => {
  const logout = () => {
    AsyncStorage.setItem("token", "")
      .then(() => AsyncStorage.setItem("token_created_date", ""))
      .then(() => navigation.navigate("Login"));
  };
  const [scrollAnimation] = React.useState(new Animated.Value(0));
  const { goals, refetch, loading, networkStatus } = useGoalsPull();
  NetworkCheckNav({ networkStatus, navigation });
  const { filtered_goals, updateFilter, filter } = GoalsFilter({ goals });
  const { sorted_goals, updateSortOrder, sortOrder } = GoalsSort({ goals: filtered_goals });

  const { updateGoal } = useGoalUpdate();
  const { removeGoal } = useGoalDelete();
  const [notification, setNotification] = useState({});
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notificationsEnabled, setnotificationsEnabled] = useState(false);

  const registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        // alert("Failed to get push token for push notification!");
        return;
      }
      let token = await Notifications.getExpoPushTokenAsync();
      setExpoPushToken(token);
      await attachToken();
    } else {
      // alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.createChannelAndroidAsync("default", {
        name: "default",
        sound: true,
        priority: "max",
        vibrate: [0, 250, 250, 250],
      });
    }
  };

  const _handleNotification = notification => {
    Vibration.vibrate();
    setNotification({ notification: notification });
  };

  const attachToken = async () => {
    AsyncStorage.getItem("notification_token").then(token => {
      setnotificationsEnabled(token !== null);
    });
    const token = AsyncStorage.getItem("token").then(token => {
      return token;
    });

    if (!notificationsEnabled) {
      if (expoPushToken) {
        await fetch(NOTIFICATION_URI, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Accept-encoding": "gzip, deflate",
            "Content-Type": "application/json",
            "authorization": `Bearer ${await token}`,
          },
          body: { expoPushToken },
        }).then(() => {
          AsyncStorage.setItem("notification_token", expoPushToken);
        });
      }
    }
  };

  let notificationSubscription;

  useEffect(() => {
    registerForPushNotificationsAsync();
    notificationSubscription = Notifications.addListener(_handleNotification);
  }, []);

  const refToConfetti = useRef(null);

  return (
    <View style={styles.container}>
      <NavigationEvents
        onWillFocus={() => {
          refetch();
        }}
      />
      <AnimatedHeader
        title={"Goals"}
        sub_title={"List"}
        logout={logout}
        logout_text={"Logout"}
        goals={goals}
        refetch={refetch}
        updateSortOrder={updateSortOrder}
        sortOrder={sortOrder}
        updateFilter={updateFilter}
        filter={filter}
        scrollAnimation={scrollAnimation}
        navigation={navigation}
      >
        <Fragment>
          <AnimatedLoading scrollAnimation={scrollAnimation} loading={loading} refetch={refetch} />
          <AnimatedFlatList
            onScroll={Animated.event(
              [
                {
                  nativeEvent: { contentOffset: { y: scrollAnimation } },
                },
              ],
              {
                useNativeDriver: true,
              },
            )}
            refreshing={loading}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            style={styles.list}
            data={sorted_goals}
            keyExtractor={goal => goal.id}
            renderItem={({ item }) => {
              return GoalItem({
                ...item,
                navigation,
                goals,
                updateGoal,
                removeGoal,
                refetch,
                goalsListConfetti: () => refToConfetti.current.start(),
              });
            }}
          />
        </Fragment>
      </AnimatedHeader>
      <Confetti ref={refToConfetti} />
    </View>
  );
};

const avatarSize = 100;
const { width } = Dimensions.get("window");
const { statusBarHeight } = Constants;
const main_background = "#FFF9FD"; //E0E5EC

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: main_background,
  },
  list: {
    flex: 1,
  },
  post: {
    paddingHorizontal: Theme.spacing.small,
  },
  header: {
    marginBottom: Theme.spacing.small,
    height: statusBarHeight * 2,
  },
  cover: {
    ...StyleSheet.absoluteFillObject,
    width,
    height: width,
  },
  avatar: {
    position: "absolute",
    right: Theme.spacing.small,
    bottom: -avatarSize * 0.5,
  },
  settings: {
    position: "absolute",
    top: statusBarHeight + Theme.spacing.small,
    right: Theme.spacing.base,
    backgroundColor: "transparent",
    zIndex: 10000,
  },
  title: {
    position: "absolute",
    left: Theme.spacing.small,
    bottom: 50 + Theme.spacing.small,
  },
  outline: {
    color: "rgba(255, 255, 255, 0.8)",
  },
  name: {
    color: "white",
  },
});

export default Goals;
