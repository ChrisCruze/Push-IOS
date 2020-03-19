import React, { useState, Fragment } from "react";
import TableCell from "../Atoms/TableCell";
import { StyleSheet, Text, View, Button } from "react-native";

const TableRow = ({ sublist }) => {
  return (
    <View style={styles.container}>
      {sublist.map((item, column_number) => (
        <View style={styles.container} key={column_number}>
          <TableCell cell={item} />
        </View>
      ))}
    </View>
  );
};

const TableRows = ({ list_of_lists }) => {
  return (
    <Fragment>
      {list_of_lists.map((sublist, row_number) => (
        <TableRow sublist={sublist} key={row_number} />
      ))}
    </Fragment>
  );
};

const TableGrid = ({ list_of_lists }) => {
  return (
    <View style={styles.master_container}>
      <TableRows list_of_lists={list_of_lists} />
    </View>
  );
};

const styles = StyleSheet.create({
  master_container: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "stretch",
  },

  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#E0E5EC",

    alignItems: "center",
    justifyContent: "center",
  },
});
export default TableGrid;
