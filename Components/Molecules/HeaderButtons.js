import React, { useState, useEffect, Fragment } from "react";
import {
  FlatList,
  Text,
  StyleSheet,
  View,
  Animated,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import Theme from "../Atoms/Theme";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Right,
  Button,
  Body,
  Item,
  Input,
  Drawer,
  Card,
  CardItem,
} from "native-base";

const DrawerContainer = ({ children, drawerState, updateDrawerState, content }) => {
  return (
    <Drawer
      content={content}
      onClose={() => drawerState._root.close()}
      ref={ref => {
        updateDrawerState(ref);
      }}
    >
      {children}
    </Drawer>
  );
};

const Sidebar = ({ Code, Name, Note }) => {
  return (
    <Content>
      <Card style={{ flex: 0 }}>
        <CardItem>
          <Body>
            <Text>{Name || ""}</Text>
            <Text>{Note || ""}</Text>
            <Text>{Code || ""}</Text>
          </Body>
        </CardItem>
      </Card>
    </Content>
  );
};

const HeaderButtons = ({ navigation }) => {
  const [drawerState, updateDrawerState] = useState();
  const [drawerObject, updateDrawerObject] = useState();

  return (
    <Fragment>
      <SafeAreaView style={[styles.innerHeader]}>
        <TouchableWithoutFeedback
          onPress={() => {
            alert("open");
            drawerState._root.open();
          }}
        >
          <Icon name={"list"} size={25} {...{ color: "white" }} />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate("Notifications");
          }}
        >
          <Icon name={"bell"} size={25} {...{ color: "white" }} />
        </TouchableWithoutFeedback>
      </SafeAreaView>
      <DrawerContainer
        content={<Sidebar {...drawerObject} />}
        drawerState={drawerState}
        updateDrawerState={updateDrawerState}
      >
        <Content></Content>
      </DrawerContainer>
    </Fragment>
  );
};
const styles = StyleSheet.create({
  innerHeader: {
    marginHorizontal: Theme.spacing.base,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    marginBottom: 0,
  },
});

export default HeaderButtons;
