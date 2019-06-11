import * as SecureStore from "expo-secure-store";
import React from "react";
import { Image, View } from "react-native";
import styles from "./styles";

export default class SplashScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    var self = this;
    this.props.navigation.addListener("didFocus", _ => {
      self.getLoggedUser().then(user => {
        console.log(user);
        setTimeout(
          () => self.props.navigation.navigate(user ? "MainPage" : "Login"),
          2500
        );
      });
    });
  }

  async getLoggedUser() {
    let token = await SecureStore.getItemAsync("token");
    return token;
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo1}
          source={require("../../assets/app_logo.png")}
        />

        <Image
          style={styles.logo2}
          source={require("../../assets/logo2.png")}
        />
      </View>
    );
  }
}
