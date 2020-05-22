import React from "react";
import { Text, View, Animated, StyleSheet } from "react-native";
import StickyParallaxHeader from "react-native-sticky-parallax-header";
//DetailsHeader
const HeaderDetailsSample = () => {
  const leftTopIconOnPress = () => {
    alert("go back");
  };
  const rightTopIconOnPress = () => {
    alert("menu");
  };
  return (
    <StickyParallaxHeader
      // headerType="DetailsHeader"
      leftTopIconOnPress={leftTopIconOnPress}
      rightTopIconOnPress={rightTopIconOnPress}
      title="Goals"
      tag="tag"
      author="a"
      // image={null}
      renderBody={() => {
        return (
          <View>
            <Text>Test</Text>
          </View>
        );
      }}
      iconNumber={20}
    />
    // <StickyParallaxHeader
    //   headerType="TabbedHeader"
    //   leftTopIconOnPress={leftTopIconOnPress}
    //   rightTopIconOnPress={rightTopIconOnPress}
    //   title="GoalsA"
    //   tag="tag"
    //   // image={null}
    //   // renderBody={undefined}
    //   iconNumber={20}
    // />
  );

  // return <StickyParallaxHeader headerType="TabbedHeader" />;
};

export default HeaderDetailsSample;

const styles = StyleSheet.create({
  content: {
    height: 1000,
    marginTop: 50,
  },
  foreground: {
    flex: 1,
    justifyContent: "flex-end",
  },
  message: {
    color: "white",
    fontSize: 40,
    paddingTop: 24,
    paddingBottom: 7,
  },
  headerWrapper: {
    backgroundColor: "green",
    width: "100%",
    paddingHorizontal: 24,
    paddingBottom: 25,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 16,
    color: "white",
    margin: 12,
  },
  tabsWrapper: {
    paddingVertical: 12,
  },
  tabTextContainerStyle: {
    backgroundColor: "transparent",
    borderRadius: 18,
  },
  tabTextContainerActiveStyle: {
    backgroundColor: "lightgreen",
  },
  tabText: {
    fontSize: 16,
    lineHeight: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: "white",
  },
});
