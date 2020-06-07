const NetworkCheckNav = ({ networkStatus, navigation }) => {
  if (networkStatus == 8) {
    navigation.navigate("Login");
  }
};
export default NetworkCheckNav;
