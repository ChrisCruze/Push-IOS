import * as React from "react";
import { View, StyleSheet, Dimensions, FlatList, TouchableOpacity, Image } from "react-native";
import Constants from "expo-constants";
import { Feather as Icon } from "@expo/vector-icons";
import APIStore from "../Atoms/APIStore";
import Theme from "../Atoms/Theme";
import Text from "../Atoms/Text";
import Images from "../Atoms/Images";
import FirstPost from "../Atoms/FirstPost";
const ProfileTemplate = ({ navigation, logout }) => {
  const uid = APIStore.me();
  const posts = APIStore.posts().filter(post => post.uid === uid);
  const profile = APIStore.profile(uid);
  return (
    <FlatList
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      data={posts}
      keyExtractor={post => post.id}
      renderItem={({ item }) => (
        <View style={styles.post}>
          <Post post={item} {...{ navigation }} />
        </View>
      )}
      ListEmptyComponent={
        <View style={styles.post}>
          <FirstPost {...{ navigation }} />
        </View>
      }
      ListHeaderComponent={
        <View style={[styles.header]}>
          <Image style={[styles.cover]} source={Images.cover} />
          <TouchableOpacity onPress={logout} style={styles.settings}>
            <View>
              <Icon name="log-out" size={25} color="white" />
            </View>
          </TouchableOpacity>
          <View style={[styles.title]}>
            <Text type="large" style={styles.outline}>
              {profile.outline}
            </Text>
            <Text type="header2" style={styles.name}>
              {profile.name}
            </Text>
          </View>
          {/* <Avatar size={avatarSize} style={styles.avatar} {...profile.picture} /> */}
        </View>
      }
    />
  );
};

const avatarSize = 100;
const { width } = Dimensions.get("window");
const { statusBarHeight } = Constants;
const styles = StyleSheet.create({
  list: {
    flex: 1
  },
  post: {
    paddingHorizontal: Theme.spacing.small
  },
  header: {
    marginBottom: avatarSize * 0.5 + Theme.spacing.small,
    height: width
  },
  cover: {
    ...StyleSheet.absoluteFillObject,
    width,
    height: width
  },
  avatar: {
    position: "absolute",
    right: Theme.spacing.small,
    bottom: -avatarSize * 0.5
  },
  settings: {
    position: "absolute",
    top: statusBarHeight + Theme.spacing.small,
    right: Theme.spacing.base,
    backgroundColor: "transparent",
    zIndex: 10000
  },
  title: {
    position: "absolute",
    left: Theme.spacing.small,
    bottom: 50 + Theme.spacing.small
  },
  outline: {
    color: "rgba(255, 255, 255, 0.8)"
  },
  name: {
    color: "white"
  }
});

export default ProfileTemplate;
