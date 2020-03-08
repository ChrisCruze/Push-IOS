import * as React from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import Theme from "./Theme";

const Container = ({ gutter, style, children }) => {
  const containerStyle = [style, styles.container, { padding: gutter * Theme.spacing.base }];
  return (
    <SafeAreaView style={styles.root}>
      <View style={containerStyle}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flexGrow: 1
  },
  container: {
    flexGrow: 1
  }
});

export default Container;
