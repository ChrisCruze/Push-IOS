import React from "react";
import SignUpContainer from "../Molecules/SignUpContainer";
import { TextField } from "../Atoms/Fields";

const Login = props => {
  const { navigation, setPasswordRef, goToPassword } = props;
  /* 
    What are setPasswordRef, goToPassword? 
    I could not find where these props are passed from
  */
  return (
    <SignUpContainer
      title="Login"
      back={() => navigation.navigate("Welcome")}
      subtitle="Get Started"
      nextLabel="Login"
      next={() => navigation.navigate("Home")}
      first
      {...{ navigation }}
    >
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
        onSubmitEditing={() => navigation.navigate("Home")}
        secureTextEntry
        contrast
      />
    </SignUpContainer>
  );
};

export default Login;
