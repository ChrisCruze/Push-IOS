import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { FORGOT_PASSWORD_URI } from "react-native-dotenv";
import { Snackbar } from "react-native-paper";
import { TextField } from "../Atoms/Fields";
import axios from "axios";

const ForgotPassword = props => {
  const [email, setEmail] = useState("");

  return (
    <View>
      <Text>Forgot Password?</Text>
      <TextField
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={setEmail}
        value={email}
        returnKeyType="next"
        contrast
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ForgotPassword;
