import * as React from "react";
import SignUpPasswordTemplate from "../Templates/SignUpPasswordTemplate";

class SignUpPassword extends React.Component {
  next = () => {
    this.props.navigation.navigate("Home");
  };

  render() {
    return <SignUpPasswordTemplate next={this.next} />;
  }
}

export default SignUpPassword;
