import React, { useState, Fragment } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  FlatList,
  SafeAreaView,
  Text,
  Vibration,
  Platform,
  SectionList,
} from "react-native";
import Constants from "expo-constants";
import Theme from "../Atoms/Theme";
import { DataFlattenConvertGoals } from "../Atoms/BarChart.functions";
import _ from "lodash";
import moment from "moment";

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);
const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.bullet}>{`\u2022`} </Text>
    <Text style={styles.title}>{`${title}`} </Text>
  </View>
);

const SectionHeader = ({ title }) => <Text style={styles.header}>{title}</Text>;

const NotificationListDataStructure = goals => {
  const pushes = DataFlattenConvertGoals(goals);
  const sorted_pushes = _.sortBy(pushes, push_dict => moment(push_dict["timeStamp"]).unix());
  const text_list = _.map(sorted_pushes, push_dict => {
    return {
      text: "You completed " + push_dict["title"],
      date: moment(push_dict["timeStamp"]).format("DD MMM YYYY"),
    };
  });
  const grouped_dict = _.groupBy(text_list, "date");
  const grouped_dict_sublis = Object.values(grouped_dict);
  const converted_list = _.map(grouped_dict_sublis, grouped_subli => {
    return { title: grouped_subli[0]["date"], data: _.map(grouped_subli, "text") };
  });
  converted_list.reverse();
  return converted_list;
};

const NotificationsList = ({ scrollAnimation, goals }) => {
  const DATA = NotificationListDataStructure(goals);

  return (
    <SafeAreaView style={styles.container}>
      <AnimatedSectionList
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
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Item title={item} />}
        renderSectionHeader={({ section: { title } }) => <SectionHeader title={title} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 36,
  },
  bullet: {
    fontSize: 16,
    fontWeight: "bold",

    color: "#005AFF",
  },
  item: {
    // backgroundColor: "#f9c2ff",
    padding: 3,
    marginVertical: 2,
    flexDirection: "row",
  },
  header: {
    marginVertical: 2,
    fontWeight: "bold",
    fontSize: 12,
    lineHeight: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 16,
  },
});
export default NotificationsList;
