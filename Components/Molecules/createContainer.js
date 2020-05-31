import * as React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Content } from "native-base";
import Text from "../Atoms/Text";
import Button from "../Atoms/Button";
import Theme from "../Atoms/Theme";
import Container from "../Atoms/Container";

const CreateContainer = ({ title, subtitle, next, children, nextLabel, back }) => {
  return (
    <Container gutter={1}>
      <Content style={styles.content}>
        <View style={styles.innerContent}>
          <Text type="large">{subtitle}</Text>
          <Text type="header2" gutterBottom>
            {title}
          </Text>
          <View style={styles.innerChildren}>{children}</View>
          <Button
            label={nextLabel || "Next"}
            onPress={next}
            full
            white
            style={{ backgroundColor: Theme.palette.buttonTheme, borderRadius: 32 }}
          />
          <Button label="Back" onPress={back} full />
        </View>
      </Content>
    </Container>
  );
};

const { height } = Dimensions.get("window");
console.log({ height });
const styles = StyleSheet.create({
  content: {
    padding: Theme.spacing.base,
    marginBottom: 50,
    marginTop: 50,
  },
  innerContent: {
    // height: height - Theme.spacing.base,
    justifyContent: "center",
  },
  innerChildren: {
    // height:300
  },
});

export default CreateContainer;
