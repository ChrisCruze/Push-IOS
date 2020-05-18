import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Vibration, 
  Platform,
} from "react-native";
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from "expo-constants";
import { Feather as Icon } from "@expo/vector-icons";
import Theme from "../Atoms/Theme";
import Text from "../Atoms/Text";
import Images from "../Atoms/Images";
import FirstPost from "../Atoms/FirstPost";
import GoalItem from "../Molecules/GoalItem";
import Header from "../Molecules/Header";
import moment from "moment";
import { useGoalsPull, useGoalUpdate, useGoalDelete } from "../../API";
import { AsyncStorage } from "react-native";


const Goals = ({ navigation }) => {
  const logout = () => {
    AsyncStorage.setItem("token", "")
      .then(() => AsyncStorage.setItem("token_created_date", ""))
      .then(() => navigation.navigate("Login"));
  };

  const { goals, refetch } = useGoalsPull();
  const { updateGoal } = useGoalUpdate();
  const { removeGoal } = useGoalDelete();
  const [notification, setNotification] = useState({});
  const [expoPushToken, setExpoPushToken] = useState('');

  const registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      let token = await Notifications.getExpoPushTokenAsync();
      console.log(token);
      setExpoPushToken(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
  };

  const _handleNotification = notification => {
    Vibration.vibrate();
    console.log(notification);
    this.setState({ notification: notification });
  };

  const sendPushNotification = async () => {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Original Title',
      body: 'And here is the body!',
      data: { data: 'goes here' },
      _displayInForeground: true,
    };
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  };


  useEffect(() => {
    refetch();
    registerForPushNotificationsAsync();
    this._notificationSubscription = Notifications.addListener(_handleNotification);
  }, []);
  const createNewGoal = () => {
    navigation.navigate("createGoal");
  };

  


  return (
    <View style={styles.container}>
      <Header title={"Goals"} sub_title={"List"} logout={logout} logout_text={"Logout"} />
      <FlatList
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={styles.list}
        data={goals}
        keyExtractor={goal => goal.id}
        renderItem={({ item }) => {
          return GoalItem({
            ...item,
            navigation,
            goals,
            updateGoal,
            removeGoal,
            refetch,
          });
        }}
        ListEmptyComponent={
          <View style={styles.post}>
            <TouchableWithoutFeedback onPress={createNewGoal}>
              <Icon name="plus-circle" color={Theme.palette.primary} size={25} />
            </TouchableWithoutFeedback>
          </View>
        }
      />
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
