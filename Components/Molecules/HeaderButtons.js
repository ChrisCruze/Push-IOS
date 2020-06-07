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
  ScrollView,
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
  Card,
  CardItem,
} from "native-base";
import Drawer from "react-native-drawer";

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
    <View style={[styles.drawerInner]}>
      <TouchableWithoutFeedback
        onPress={() => {
          alert("clsoe");
        }}
      >
        <Text>Close</Text>
      </TouchableWithoutFeedback>
      <Card style={{ flex: 0 }}>
        <CardItem>
          <Body>
            <Text>{"test"}</Text>
            <Text>{"test"}</Text>
            <Text>{"test"}</Text>
          </Body>
        </CardItem>
      </Card>
    </View>
  );
};
const ControlPanel = () => {
  return (
    <View style={[styles.container]}>
      <ScrollView style={styles.container}>
        <Text style={styles.controlText}>Control Panel</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            alert("hi");
          }}
        >
          <Text>Close Drawer</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
const HeaderButtons = ({ navigation }) => {
  const [drawerState, updateDrawerState] = useState();

  return (
    <View style={[]}>
      <SafeAreaView style={[styles.innerHeader]}>
        <TouchableWithoutFeedback
          onPress={() => {
            drawerState.open();
          }}
        >
          <Icon name={"list"} size={25} {...{ color: "white" }} />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            // drawerState.close();

            navigation.navigate("Notifications");
          }}
        >
          <Icon name={"bell"} size={25} {...{ color: "white" }} />
        </TouchableWithoutFeedback>
      </SafeAreaView>

      <Drawer
        content={<ControlPanel />}
        tapToClose={true}
        type="overlay"
        styles={drawerStyles}
        onClose={() => drawerState.close()}
        // openDrawerOffset={200}
        // tweenHandler={Drawer.tweenPresets.parallax}
        ref={ref => {
          updateDrawerState(ref);
        }}
      ></Drawer>

      {/* 
      <DrawerContainer
        content={<Sidebar />}
        drawerState={drawerState}
        updateDrawerState={updateDrawerState}
      >
        <View>
          <Text>test</Text>
        </View>
      </DrawerContainer> */}
    </View>
  );
};

const styles = StyleSheet.create({
  drawerInner: { flex: 1, height: 1000 },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "black",
  },
  controlText: {
    color: "white",
  },
  button: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
  },
  innerHeader: {
    marginHorizontal: Theme.spacing.base,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    marginBottom: 0,
  },
});
const drawerStyles = {
  drawer: { shadowColor: "#000000", shadowOpacity: 0.8, shadowRadius: 3 },
  main: { paddingLeft: 3 },
};
export default HeaderButtons;
