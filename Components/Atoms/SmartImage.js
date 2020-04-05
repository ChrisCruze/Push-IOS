import * as _ from "lodash";
// import * as React from "react";
import React, { Fragment, Component, useState, useEffect } from "react";

import { Image as RNImage, Animated, StyleSheet, View, Platform } from "react-native";
import { BlurView } from "expo-blur";

export const SmartImage = ({ preview, style, uri }) => {
  const [state, updateState] = useState({
    uri: undefined,
    intensity: new Animated.Value(100),
  });

  // const { uri, intensity } = state;
  const hasPreview = !!preview;
  const opacity = state.intensity.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 0.5],
  });
  const computedStyle = [
    StyleSheet.absoluteFillObject,
    _.transform(
      _.pickBy(StyleSheet.flatten(style), (value, key) => propsToCopy.indexOf(key) !== -1),
      // $FlowFixMe
      (result, value, key) => Object.assign(result, { [key]: value - (style.borderWidth || 0) }),
    ),
  ];
  return (
    <View {...{ style }}>
      <RNImage source={{ uri }} resizeMode="cover" style={computedStyle} />
    </View>
  );
};
const black = "black";
const propsToCopy = [
  "borderRadius",
  "borderBottomLeftRadius",
  "borderBottomRightRadius",
  "borderTopLeftRadius",
  "borderTopRightRadius",
];
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
export default SmartImage;
