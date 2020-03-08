import * as React from "react";
import SignUpNameTemplate from "../Templates/SignUpNameTemplate";

class SignUpName extends React.Component {
  next = () => {
    this.props.navigation.navigate("SignUpEmail");
  };

  render() {
    return <SignUpNameTemplate next={this.next} />;
  }
}

export default SignUpName;
