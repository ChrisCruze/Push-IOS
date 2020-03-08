import * as React from "react";
import SignUpEmailTemplate from "../Templates/SignUpEmailTemplate";

class SignUpEmail extends React.Component {
  next = () => {
    this.props.navigation.navigate("SignUpPassword");
  };

  render() {
    return <SignUpEmailTemplate next={this.next} />;
  }
}

export default SignUpEmail;
