import * as React from "react";
import { StyleSheet } from "react-native";
import { Button as NBButton, Text, Spinner } from "native-base";
import Theme from "./Theme";

const Button = ({ label, full, primary, disabled, transparent, onPress, style, loading }) => {
  const computedStyle = [styles.base];
  if (primary && !transparent) {
    computedStyle.push(styles.primary);
  }
  computedStyle.push(style);
  return (
    <NBButton
      {...{
        full,
        primary,
        onPress,
        style: computedStyle,
        transparent: !primary || transparent,
        disabled
      }}
    >
      {!!loading && <Spinner color="white" />}
      {!loading && (
        <Text
          style={[
            primary ? Theme.typography.large : Theme.typography.regular,
            {
              color: disabled ? "transparent" : primary ? (transparent ? Theme.palette.primary : "white") : Theme.typography.color,
              fontSize: primary ? 16 : Theme.typography.regular.fontSize,
              fontFamily: Theme.typography.semibold
            }
          ]}
        >
          {label}
        </Text>
      )}
    </NBButton>
  );
};

const styles = StyleSheet.create({
  base: {},
  primary: {
    shadowColor: "rgba(0, 170, 255, 0.29)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 7
  }
});

export default Button;
