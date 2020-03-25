import React, { useState, Fragment } from "react";
import TableCell from "../Atoms/TableCell";
import { StyleSheet, Text, View, Button } from "react-native";
import Constants from "expo-constants";

const Cell = () => {
  return <View style={styles.cell_container}></View>;
};
const TableRow = ({ sublist }) => {
  return (
    <View style={styles.row_container}>
      {sublist.map((item, column_number) => (
        <TableCell key={column_number} cell={item} />
      ))}
    </View>
  );
};

const TableGrid = ({ list_of_lists }) => {
  return (
    <Fragment>
      {list_of_lists.map((sublist, row_number) => (
        <TableRow sublist={sublist} key={row_number} />
      ))}
    </Fragment>
  );
};
const styles = StyleSheet.create({
  row_container: {
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "center",
  },
  cell_container: {
    backgroundColor: "#ebedf0",
    margin: 2,
    height: 20,
    width: 20,
  },
});
export default TableGrid;
