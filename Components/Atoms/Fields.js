import * as _ from "lodash";
import * as React from "react";
import { TextInput, StyleSheet } from "react-native";

import Theme from "./Theme";

export const TextField = input_props => {
  const { textInputRef, secureTextEntry } = input_props;
  const keysToFilter = ["contrast", "label", "textInputRef"];
  const props = _.pickBy(input_props, (value, key) => keysToFilter.indexOf(key) === -1);
  return (
    <TextInput
      secureTextEntry={secureTextEntry}
      ref={textInputRef}
      style={styles.textInput}
      placeholderTextColor={Theme.typography.color}
      {...props}
      underlineColorAndroid="transparent"
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderColor: Theme.palette.borderColor,
    borderWidth: 1,
    borderRadius: 3,
    ...Theme.typography.regular,
    color: Theme.typography.color,
    padding: Theme.spacing.small,
    marginBottom: Theme.spacing.base,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 1,
  },
});
