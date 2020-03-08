import * as React from "react";
import WelcomeTemplate from "../Templates/WelcomeTemplate";

class Welcome extends React.Component {
  login = () => {
    this.props.navigation.navigate("Login");
  };

  signUp = () => {
    this.props.navigation.navigate("SignUp");
  };

  render() {
    return <WelcomeTemplate login={this.login} signUp={this.signUp} />;
  }
}

export default Welcome;
