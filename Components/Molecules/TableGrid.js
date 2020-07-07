import React, { useState, Fragment } from "react";
import TableCell from "../Atoms/TableCell";
import { StyleSheet, Text, View, Button } from "react-native";

const days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];

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

const MonthTitleFromListofLists = list_of_lists => {
  const first_cell = list_of_lists[0][0]["month"];
  const last_cell = list_of_lists[list_of_lists.length - 1][list_of_lists[0].length - 1]["month"];
  const month_text = `${first_cell} - ${last_cell}`;
  return month_text;
};
const TableTitleMonth = ({ list_of_lists }) => {
  const monthText = MonthTitleFromListofLists(list_of_lists);
  return (
    <View style={styles.calendar_title}>
      <Text style={styles.calendar_title_text}>{monthText}</Text>
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
    <View style={styles.calendar_container}>
      <TableTitleMonth list_of_lists={list_of_lists} />
      <TableHeader />
      {list_of_lists.map((sublist, row_number) => (
        <TableRow sublist={sublist} key={row_number} />
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  calendar_container: {
    marginHorizontal: 50,
    marginTop: 10,
  },
  row_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    backgroundColor: "#FFFFFF",
    margin: 2,
    height: 20,
    width: 30,
    alignItems: "center",
  },
  calendar_title: {
    alignItems: "center",
    justifyContent: "center",
  },
  calendar_title_text: {
    fontSize: 18,
  },
});
export default TableGrid;
