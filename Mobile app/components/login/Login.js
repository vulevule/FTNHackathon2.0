import * as SecureStore from "expo-secure-store";
import React from "react";
import { BackHandler, Image, Text, TouchableOpacity, View } from "react-native";
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./styles";

export default class Login extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      username: "test",
      password: "test"
    };
    this.login = this.login.bind(this);
  }

  // componentDidMount() {
  //   BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  // }

  // componentWillUnmount() {
  //   BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  // }

  handleBackButton() {
    // return true;
    BackHandler.exitApp();
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../../assets/login_logo.png")}
        />
        <Input
          onChangeText={text => this.setState({ username: text })}
          placeholder="Username"
          leftIcon={
            <Icon
              name="user"
              size={24}
              color="black"
              style={{ marginRight: 10 }}
            />
          }
        />

        <Input
          onChangeText={text => this.setState({ password: text })}
          placeholder="Password"
          secureTextEntry={true}
          leftIcon={
            <Icon
              name="lock"
              size={24}
              color="black"
              style={{ marginRight: 10 }}
            />
          }
        />

        <TouchableOpacity
          title="Log in"
          onPress={this.login}
          style={styles.loginBtn}
        >
          <Text style={styles.loginText}>Log in</Text>
        </TouchableOpacity>

        <View style={styles.bottomButtons}>
          <View style={{ marginRight: 3 }}>
            <Icon.Button
              name="facebook"
              backgroundColor="#3b5998"
              onPress={this.loginWithFacebook}
            >
              Login with Facebook
            </Icon.Button>
          </View>
          <View style={{ marginLeft: 3 }}>
            <Icon.Button
              name="google"
              backgroundColor="#0F9D58"
              onPress={this.loginWithGoogle}
            >
              Login with Google
            </Icon.Button>
          </View>
        </View>

        <TouchableOpacity
          title="Log in"
          onPress={() => navigation.navigate("Signup")}
          style={{ marginTop: 50 }}
        >
          <Text style={{ color: "#0645AD" }}>
            Don't have an account? Sign up here
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  async login() {
    //ToastAndroid.show(JSON.stringify(this.state), ToastAndroid.SHORT);
    try {
      let response = await fetch(
        "https://47817401.ngrok.io/api/v1/auth/user/login",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: this.state.username,
            password: this.state.password
          })
        }
      );

      let responseJson = await response.json();
      if (responseJson.success) {
        let token = responseJson.token.toString();
        await SecureStore.setItemAsync("token", token);
        this.props.navigation.navigate("MainPage");
      } else {
        alert("Invalid username or password");
      }

      //TODO
    } catch (error) {}
  }

  loginWithFacebook() {}

  loginWithGoogle() {}
}
