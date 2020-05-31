import React from "react";
import ConfettiCannon from "react-native-confetti-cannon";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const Confetti = React.forwardRef(function passRefToChild(props, ref) {
  return (
    <ConfettiCannon
      count={200}
      origin={{ x: windowWidth / 2, y: -15 }}
      autoStart={false}
      ref={ref}
      fadeOut={true}
      fallSpeed={5000}
    />
  );
});

export default Confetti;
