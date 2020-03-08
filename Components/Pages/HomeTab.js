import * as React from "react";
import HomeTabTemplate from "../Templates/HomeTabTemplate";

class HomeTab extends React.Component {
  navigate = i => {
    this.props.navigation.navigate(i);
  };

  render() {
    return <HomeTabTemplate navigation={this.props.navigation} navigate={this.navigate} />;
  }
}

export default HomeTab;
