import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Content } from "native-base";
import { FORGOT_PASSWORD_URI } from "react-native-dotenv";
import { Snackbar } from "react-native-paper";
import LoadingIndicator from "../Atoms/LoadingIndicator";
import Button from "../Atoms/Button";
import { TextField } from "../Atoms/Fields";
import Container from "../Atoms/Container";
import Theme from "../Atoms/Theme";
import Text from "../Atoms/Text";
import axios from "axios";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackVisibility, setSnackVisibility] = useState(false);

  const submitPasswordReset = () => {
    if (email === "") {
      setSnackMessage("Email can't be empty.");
      setSnackVisibility(true);
    } else {
      setLoading(true);
      axios
        .post(FORGOT_PASSWORD_URI, {
          email,
        })
        .then(response => {
          if (response.status === 200) {
            setSnackMessage(`Success! ${response.data}`);
            setSnackVisibility(true);
            setLoading(false);
          }
        })
        .catch(error => {
          if (error.message === "Request failed with status code 404") {
            setSnackMessage("Email address not found");
          } else if (error.message === "Request failed with status code 422") {
            setSnackMessage("Email address format not valid");
          }
          setLoading(false);
          setSnackVisibility(true);
        });
    }
  };

  return loading ? (
    <Container gutter={1}>
      <LoadingIndicator />
    </Container>
  ) : (
    <Container gutter={1}>
      <Content style={styles.content}>
        <View style={styles.innerContent}>
          <Text type="large">Forgot Password</Text>
          <Text type="header2" gutterBottom>
            Enter email
          </Text>
          <View>
            <TextField
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={setEmail}
              value={email}
              returnKeyType="done"
              contrast
            />
          </View>
          <Button label={"Submit"} onPress={submitPasswordReset} full primary />
          <Button label="Back" onPress={() => navigation.navigate("Login")} full />
        </View>
      </Content>
      <Snackbar
        visible={snackVisibility}
        style={styles.snackbar}
        onDismiss={() => {
          setSnackVisibility(false);
          setSnackMessage("");
        }}
        action={{
          label: "OK",
          onPress: () => {},
        }}
      >
        <Text style={styles.message}>{snackMessage}</Text>
      </Snackbar>
    </Container>
  );
};

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  content: {
    padding: Theme.spacing.base,
  },
  innerContent: {
    height: height - Theme.spacing.base * 4,
    justifyContent: "center",
  },
  snackbar: {
    position: "absolute",
    bottom: 25,
    left: width * 0.1,
    width: width * 0.8,
  },
  message: {
    fontFamily: "SFProText-Medium",
    color: "#FFF",
    fontSize: 14,
    textAlign: "center",
  },
});

export default ForgotPassword;
