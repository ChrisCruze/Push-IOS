import * as React from "react";
import { Text as RNText } from "react-native";
import Theme from "./Theme";

export class TextClass extends React.Component {
  render() {
    const { type, style, numberOfLines, gutterBottom, children } = this.props;
    const defaultStyle = [Theme.typography[type], { backgroundColor: "transparent" }];
    const isHeader = type.startsWith("header");
    defaultStyle.push({
      // eslint-disable-next-line
      color: isHeader
        ? "black"
        : type === "large"
        ? Theme.palette.lightGray
        : Theme.typography.color,
      // eslint-disable-next-line
      marginBottom: gutterBottom ? (isHeader ? Theme.spacing.base : Theme.spacing.small) : 0,
    });
    defaultStyle.push(style);
    return (
      <RNText style={defaultStyle} {...{ numberOfLines }}>
        {type === "large" ? children.toUpperCase() : children}
      </RNText>
    );
  }
}

const Text = ({ type, style, numberOfLines, gutterBottom, children }) => {
  const base_type = type || "regular";
  const defaultStyle = [Theme.typography[base_type], { backgroundColor: "transparent" }];
  const isHeader = base_type.startsWith("header");
  defaultStyle.push({
    // eslint-disable-next-line
    color: isHeader
      ? "black"
      : base_type === "large"
      ? Theme.palette.lightGray
      : Theme.typography.color,
    // eslint-disable-next-line
    marginBottom: gutterBottom ? (isHeader ? Theme.spacing.base : Theme.spacing.small) : 0,
  });
  defaultStyle.push(style);
  return (
    <RNText style={defaultStyle} {...{ numberOfLines }}>
      {base_type === "large" ? children.toUpperCase() : children}
    </RNText>
  );
};

export default Text;
