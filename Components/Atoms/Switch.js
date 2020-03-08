import React, { Fragment, Component, useState, useEffect } from "react";

import { Switch as RNSwitch } from "react-native";
import Theme from "./Theme";

const Switch = ({ onTintColor, onToggle, defaultValue }) => {
  [value, updateValue] = useState(defaultValue || false);
  function toggle() {
    updateValue(!value);
    if (onToggle) {
      onToggle(!value);
    }
  }
  return (
    <RNSwitch
      trackColor={{ false: onTintColor || Theme.palette.primary, true: onTintColor || Theme.palette.primary }}
      onValueChange={toggle}
      {...{ value }}
    />
  );
};

export default Switch;
