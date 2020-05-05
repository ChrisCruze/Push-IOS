import React, { useState } from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import { Snackbar } from 'react-native-paper';
import SignUpContainer from "../Molecules/SignUpContainer";
import { TextField } from "../Atoms/Fields";

const SignUpNameTemplate = ({ navigation }) => {
  const [username, updateUserName] = useState("");
  const [visible, setVisible] = useState(0);
  const [message, setMessage] = useState("");

  const _onDismissSnackBar = () => { setVisible(0), setMessage("") };

  const onSubmit = () => {
    if (username==="") {
      setMessage("Username can't be empty.");
      setVisible(1);
    }
    else
    {
      navigation.navigate("SignUpEmail", { username });
    }
  };

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
        <Text style={styles.message}>
          {message}
        </Text>
      </Snackbar>
    )
  }

  return (
    <SignUpContainer
      back={() => navigation.navigate("Welcome")}
      title="Your Username"
      subtitle="What's your username?"
      next={onSubmit}
      first
      snackbar={snackbar(visible, message)}
      {...{ navigation }}
    >
      <TextField
        placeholder="Username"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
        onChangeText={updateUserName}
        value={username}
      />
    </SignUpContainer>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
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

export default SignUpNameTemplate;
