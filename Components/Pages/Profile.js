import * as React from "react";
import ProfileTemplate from "../Templates/ProfileTemplate";

class Profile extends React.Component {
  logout = () => {
    this.props.navigation.navigate("Login");
  };

  render() {
    return <ProfileTemplate logout={this.logout} navigation={this.props.navigation} />;
  }
}

export default Profile;