import * as React from "react";
import { TextInput } from "react-native";
import { StyleSheet, View } from "react-native";

import SignUpContainer from "../Molecules/SignUpContainer";
import { TextField } from "../Atoms/Fields";
import Theme from "../Atoms/Theme";
import Text from "../Atoms/Text";
import Switch from "../Atoms/Switch";

const SignUpEmail = ({ navigation, setLastNameRef, goToLastName }) => {
  const next = () => navigation.navigate("SignUpPassword");
  return (
    <SignUpContainer
      title="Your Email"
      subtitle="We won't spam"
      back={() => navigation.navigate("SignUp")}
      next={next}
      {...{ navigation }}
    >
      <TextField
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="go"
        onSubmitEditing={next}
        contrast
      />
      <View style={styles.row}>
        <Switch />
        <Text style={styles.text}>Sign up for the newsletter</Text>
      </View>
    </SignUpContainer>
  );
};

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
});

export default SignUpEmail;
