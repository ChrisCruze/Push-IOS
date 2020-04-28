import React, { useState } from "react";
import { TextInput } from "react-native";
import { StyleSheet, View, Dimensions, Text as Text1 } from "react-native";
import { Snackbar } from 'react-native-paper';

import SignUpContainer from "../Molecules/SignUpContainer";
import { TextField } from "../Atoms/Fields";
import Theme from "../Atoms/Theme";
import Text from "../Atoms/Text";
import Switch from "../Atoms/Switch";

const SignUpEmail = ({ navigation, setLastNameRef, goToLastName }) => {
  const [email, updateEmail] = useState("");
  const [visible, setVisible] = useState(0);
  const [message, setMessage] = useState("");

  const _onDismissSnackBar = () => { setVisible(0), setMessage("") };

  const snackbar = (visible, message) => {
    return (
      <Snackbar
        visible={visible}
        onDismiss={_onDismissSnackBar}
        style={styles.snackbar}
        action={{
          label: 'Okay',
          onPress: () => {
            // Do something
          },
        }}
      >
        <Text1 style={styles.message}>
          {message}
        </Text1>
      </Snackbar>
    )
  }

  const onSubmit = () => {
    if (email==="") {
      setMessage("Email can't be empty.");
      setVisible(1);
    }
    else
    {
      const username = navigation.getParam("username");
      navigation.navigate("SignUpPassword", { email, username });
    }
  };

  return (
    <SignUpContainer
      title="Your Email"
      subtitle="We won't spam"
      back={() => navigation.navigate("SignUp")}
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
      <View style={styles.row}>
        <Switch />
        <Text style={styles.text}>Sign up for the newsletter</Text>
      </View>
    </SignUpContainer>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  text: {
    flexWrap: "wrap",
    marginLeft: Theme.spacing.small,
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: Theme.spacing.tiny,
  },
  snackbar: {
    position: 'absolute',
    bottom: 25,
    left: width * 0.1,
    width: width * 0.8
  },
  message: {
    fontFamily: 'SFProText-Medium',
    color: '#FFF',
    fontSize: 14
  }
});

export default SignUpEmail;
