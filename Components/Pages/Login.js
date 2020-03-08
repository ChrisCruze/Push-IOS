import * as React from "react";
import LoginTemplate from "../Templates/LoginTemplate";

class Login extends React.Component {
  back = () => {
    this.props.navigation.navigate("Welcome");
  };

  login = () => {
    this.props.navigation.navigate("Home");
  };

  render() {
    return <LoginTemplate back={this.back} login={this.login} />;
  }
}

export default Login;
