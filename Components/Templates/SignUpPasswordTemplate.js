import * as React from "react";
import { TextInput } from "react-native";
import { StyleSheet, View } from "react-native";

import SignUpContainer from "../Molecules/SignUpContainer";
import { TextField } from "../Atoms/Fields";
import Theme from "../Atoms/Theme";
import Text from "../Atoms/Text";
import Switch from "../Atoms/Switch";

const SignUpPasswordTemplate = ({ navigation, next }) => {
  return (
    <SignUpContainer title="Your Password" subtitle="Stay Safe" nextLabel="Sign-Up" next={next} {...{ navigation }}>
      <TextField
        placeholder="Password"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="go"
        onSubmitEditing={next}
        secureTextEntry
        contrast
      />
    </SignUpContainer>
  );
};

export default SignUpPasswordTemplate;
