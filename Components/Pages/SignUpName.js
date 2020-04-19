import React, { useState } from "react";

import SignUpContainer from "../Molecules/SignUpContainer";
import { TextField } from "../Atoms/Fields";

const SignUpNameTemplate = ({ navigation }) => {
  const [username, updateUserName] = useState("");

  const onSubmit = () => {
    navigation.navigate("SignUpEmail", { username });
  };

  return (
    <SignUpContainer
      back={() => navigation.navigate("Welcome")}
      title="Your Username"
      subtitle="What's your username?"
      next={onSubmit}
      first
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

export default SignUpNameTemplate;
