import React, { useState, Fragment } from "react";
import TableCell from "../Atoms/TableCell";
import { StyleSheet, Text, View, Button } from "react-native";

const days = ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"];

const TableHeader = () => {
  return (
    <View style={styles.row_container}>
      {days.map(day => {
        return (
          <View key={days[day]} style={styles.header}>
            <Text>{day}</Text>
          </View>
        );
      })}
    </View>
  );
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
      <TableHeader />
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
  header: {
    backgroundColor: "#FFFFFF",
    margin: 2,
    height: 20,
    width: 30,
    alignItems: "center",
  },
});
export default TableGrid;
