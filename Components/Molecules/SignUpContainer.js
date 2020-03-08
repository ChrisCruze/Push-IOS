import * as React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Content } from "native-base";
import Text from "../Atoms/Text";
import Button from "../Atoms/Button";
import Theme from "../Atoms/Theme";
import Container from "../Atoms/Container";

const SignUpContainer = ({ title, subtitle, next, children, nextLabel, back }) => {
  return (
    <Container gutter={1}>
      <Content style={styles.content}>
        <View style={styles.innerContent}>
          <Text type="large">{subtitle}</Text>
          <Text type="header2" gutterBottom>
            {title}
          </Text>
          <View>{children}</View>
          <Button label={nextLabel || "Next"} onPress={next} full primary />
          <Button label="Back" onPress={back} full />
        </View>
      </Content>
    </Container>
  );
};

const { height } = Dimensions.get("window");
const styles = StyleSheet.create({
  content: {
    padding: Theme.spacing.base
  },
  innerContent: {
    height: height - Theme.spacing.base * 4,
    justifyContent: "center"
  }
});

export default SignUpContainer;
