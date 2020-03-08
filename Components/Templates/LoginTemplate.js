import * as React from "react";
import { TextInput } from "react-native";

import SignUpContainer from "../Molecules/SignUpContainer";
import { TextField } from "../Atoms/Fields";

const LoginTemplate = ({ navigation, setPasswordRef, goToPassword, login, back, next }) => {
  return (
    <SignUpContainer title="Login" back={back} next={next} subtitle="Get Started" nextLabel="Login" next={login} first {...{ navigation }}>
      <TextField
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
        onSubmitEditing={goToPassword}
        contrast
      />
      <TextField
        placeholder="Password"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="go"
        textInputRef={setPasswordRef}
        onSubmitEditing={login}
        secureTextEntry
        contrast
      />
    </SignUpContainer>
  );
};

export default LoginTemplate;
