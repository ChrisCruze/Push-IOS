import * as React from "react";
import GoalTemplate from "../Templates/GoalTemplate";

class Goal extends React.Component {
  back = () => {
    this.props.navigation.navigate("Profile");
  };
  render() {
    return (
      <GoalTemplate
        id={this.props.navigation.getParam("id")}
        navigation={this.props.navigation}
        params={this.props.navigation.state.params}
        back={this.back}
      />
    );
  }
}

export default Goal;
