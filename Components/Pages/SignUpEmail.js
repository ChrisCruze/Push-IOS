import React, { useState } from "react";
import { StyleSheet, Dimensions, Text as Text1 } from "react-native";
import { Snackbar } from "react-native-paper";

import SignUpContainer from "../Molecules/SignUpContainer";
import { TextField } from "../Atoms/Fields";

const SignUpEmail = ({ navigation }) => {
  const [email, updateEmail] = useState("");
  const [visible, setVisible] = useState(0);
  const [message, setMessage] = useState("");

  const _onDismissSnackBar = () => {
    setVisible(0), setMessage("");
  };

  const snackbar = (visible, message) => {
    return (
      <Snackbar
        visible={visible}
        onDismiss={_onDismissSnackBar}
        style={styles.snackbar}
        action={{
          label: "Okay",
          onPress: () => {},
        }}
      >
        <Text1 style={styles.message}>{message}</Text1>
      </Snackbar>
    );
  };

  const onSubmit = () => {
    if (email === "") {
      setMessage("Email can't be empty.");
      setVisible(1);
    } else {
      const username = navigation.getParam("username");
      navigation.navigate("SignUpPassword", { email, username });
    }
  };

  return (
    <SignUpContainer
      title="Your Email"
      subtitle="We won't spam"
      back={() => navigation.navigate("Welcome")}
      next={onSubmit}
      snackbar={snackbar(visible, message)}
      {...{ navigation }}
    >
      <TextField
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="go"
        onChangeText={updateEmail}
        value={email}
        contrast
      />
    </SignUpContainer>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  snackbar: {
    position: "absolute",
    bottom: 25,
    left: width * 0.1,
    width: width * 0.8,
  },
  message: {
    fontFamily: "SFProText-Medium",
    color: "#FFF",
    fontSize: 14,
  },
});

export default SignUpEmail;
