import * as _ from "lodash";
import React, { Fragment, Component, useState, useEffect } from "react";
import { Animated, StyleSheet, Easing, Platform } from "react-native";

export const simpleInterpolation = (start, finish) => ({
  inputRange: [0, 1],
  outputRange: [start, finish],
});

export const directInverseInterpolation = () => simpleInterpolation(1, 0);
export const directInterpolation = () => simpleInterpolation(0, 1);

export const AnimatedView = ({ children, style, animations, delay, easing, duration }) => {
  const [animation, updateAnimation] = useState(new Animated.Value(0));
  const styleFlattened = StyleSheet.flatten(style) || {};
  const newStyle = _.pickBy(styleFlattened, (value, key) => key !== "transform");
  const animatedStyle = {};
  const transformStyle = { transform: [] };

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration,
      delay,
      easing,
      useNativeDriver: Platform.OS === "ios",
    }).start();
  }, []);

  _.forEach(animations, (interpolation, prop) => {
    if (prop !== "transform") {
      animatedStyle[prop] = animation.interpolate(interpolation);
    } else {
      interpolation.forEach(transformation => {
        _.forEach(transformation, (i, key) => {
          transformStyle.transform.push({ [key]: animation.interpolate(i) });
        });
      });
    }
  });

  if (styleFlattened.transform) {
    transformStyle.transform = [...transformStyle.transform, ...styleFlattened.transform];
  }

  return (
    <Animated.View style={[newStyle, animatedStyle, transformStyle]}>{children}</Animated.View>
  );
};
