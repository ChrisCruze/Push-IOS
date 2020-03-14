import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Button } from "react-native-elements";

const GoalItem = goal => {
  const { id, title, totalCount, cadenceCount } = goal;
  return (
    <View style={styles.container}>
      <Button
        title={`${title} - ${totalCount}`}
        onPress={() => console.log("record activity!")}
        style={styles.mainButton}
      />
      <Icon
        raised
        name="more-horiz"
        type="material"
        color="#f50"
        onPress={() => console.log(`navigate to options page ${id}`)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  mainButton: {
    flexGrow: 15,
    width: 250,
    height: 30,
  },
  optionsButton: { flexGrow: 1 },
  height: 30,
});

export default GoalItem;
