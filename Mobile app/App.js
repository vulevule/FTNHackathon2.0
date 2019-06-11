import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "react-navigation";
import Login from "./components/login/Login";
import MainPage from "./components/main_page/MainPage";
import MapScreen from "./components/map/Map";
import QRScanner from "./components/qr_scanner/QRScanner";
import Signup from "./components/signup/Signup";
import SplashScreen from "./components/splash_screen/Splashscreen";
import colors from "./util/colors";
import { normalize } from "./util/sizes";

const RootStack = createStackNavigator(
  {
    SplashScreen: SplashScreen,
    Login: Login,
    Signup: Signup,
    MainPage: MainPage,
    MapScreen: MapScreen,
    QRScanner: QRScanner
  },
  {
    initialRouteName: "SplashScreen",
    navigationOptions: {
      headerStyle: {
        backgroundColor: colors.green
      },
      headerTintColor: "#ffffff",
      headerTitleStyle: {
        fontSize: normalize(16),
        fontWeight: "500"
      }
    }
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
