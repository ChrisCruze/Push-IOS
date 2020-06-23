import * as React from "react";
import { View, StyleSheet } from "react-native";
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

const styles = StyleSheet.create({
  content: {
    padding: Theme.spacing.base,
    marginBottom: 25,
    marginTop: 50,
  },
  innerContent: {
    justifyContent: "center",
  },
  innerChildren: {
    marginBottom: 50,
  },
});

export default CreateContainer;
