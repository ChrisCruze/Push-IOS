import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
const TableCell = ({ cell }) => {
  // console.log({ cell });
  return (
    <View
      style={{
        backgroundColor: cell.backgroundColor || "#ebedf0",

        margin: 2,
        height: 20,
        width: 30,
        alignItems: "center",
      }}
    >
      <Text style={{ color: cell.color || "#ebedf0" }}>{cell.count > 0 ? cell.count : "-"}</Text>
    </View>
  );
};

export default TableCell;
