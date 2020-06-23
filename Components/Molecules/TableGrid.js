import React, { useState, Fragment } from "react";
import TableCell from "../Atoms/TableCell";
import { StyleSheet, Text, View, Button } from "react-native";

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
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 50,
  },
});
export default TableGrid;
