import * as SecureStore from "expo-secure-store";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Input } from "react-native-elements";
import styles from "./styles";

export default class Signup extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      password: "",
      cardNum: ""
    };
    this.signup = this.signup.bind(this);
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Input
          onChangeText={text => this.setState({ name: text })}
          placeholder="Name"
          label="Enter full name"
        />

        <Input
          onChangeText={text => this.setState({ username: text })}
          placeholder="Username"
          label="Enter username"
        />

        <Input
          onChangeText={text => this.setState({ password: text })}
          secureTextEntry={true}
          placeholder="Password"
          label="Enter password"
        />

        <Input
          onChangeText={text => this.setState({ cardNum: text })}
          placeholder="Card number"
          label="Enter card number"
        />

        <TouchableOpacity
          title="Register"
          onPress={this.signup}
          style={styles.loginBtn}
        >
          <Text style={styles.loginText}>Register</Text>
        </TouchableOpacity>
      </View>
    );
  }

  async signup() {
    //ToastAndroid.show(JSON.stringify(this.state), ToastAndroid.SHORT);
    try {
      let response = await fetch(
        "https://47817401.ngrok.io/api/v1/auth/user/register",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: this.state.name,
            email: this.state.username,
            password: this.state.password,
            cardNum: this.state.cardNum
          })
        }
      );

      let responseJson = await response.json();
      if (responseJson.success) {
        let token = responseJson.token.toString();
        await SecureStore.setItemAsync("token", token);
        this.props.navigation.navigate("MainPage");
      } else {
        // alert("Invalid username or password");
        // TODO to be added if user exists
      }
    } catch (error) {}
  }

  loginWithFacebook() {}

  loginWithGoogle() {}
}
