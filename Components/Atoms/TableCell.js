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
        width: 20,
        alignItems: "center",
      }}
    >
      <Text>{cell.count > 0 ? cell.count : "-"}</Text>
    </View>
  );
};

// const TableCell = () => {
//   return (
//     <View
//       style={{
//         flexDirection: "row",
//         height: 10,
//         width: 10,
//       }}
//     >
//       <View
//         style={{
//           backgroundColor: "#E0E5EC",
//           shadowColor: "#a3b1c6",
//           shadowRadius: "16px",
//           shadowOpacity: 0.6,
//           shadowOffset: { width: "9px", height: "9px" },
//           flex: 0.5,
//         }}
//       >
//         <View
//           style={{
//             backgroundColor: "#E0E5EC",
//             shadowColor: "#ffffff",
//             shadowRadius: "16px",
//             shadowOpacity: 0.5,
//             shadowOffset: { width: "-9px", height: "-9px" },
//             flex: 1,
//           }}
//         ></View>
//       </View>
//     </View>
//   );
// };

export default TableCell;
