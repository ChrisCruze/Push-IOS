import * as React from "react";

import SignUpContainer from "../Molecules/SignUpContainer";
import { TextField } from "../Atoms/Fields";

const SignUpNameTemplate = ({ navigation, setLastNameRef, goToLastName }) => {
  const next = () => navigation.navigate("SignUpEmail");

  return (
    <SignUpContainer title="Your Name" subtitle="Who are you" next={next} first {...{ navigation }}>
      <TextField
        placeholder="First Name"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
        onSubmitEditing={goToLastName}
      />
      <TextField
        placeholder="Last Name"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="go"
        textInputRef={setLastNameRef}
        onSubmitEditing={next}
      />
    </SignUpContainer>
  );
};

export default SignUpNameTemplate;
