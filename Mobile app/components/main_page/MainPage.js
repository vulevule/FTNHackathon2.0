import * as SecureStore from "expo-secure-store";
import React from "react";
import { BackHandler, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import MapScreen from "../map/Map";
import styles from "./styles";

export default class MainPage extends React.Component {
  // state = {
  //   rideID: "0"
  // };

  constructor() {
    super();
    this.state = {
      rideID: "0",
      isOpen: false
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: "GreeNS",
    headerLeft: (
      <TouchableOpacity style={{ paddingLeft: 15 }}>
        <Icon name="bars" type="font-awesome" color="#ffffff" />
      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity
        style={{ paddingRight: 15 }}
        onPress={async () => {
          let rideID = await SecureStore.getItemAsync("rideID");
          if (rideID) {
            alert("Please finish drive first!");
          } else {
            await SecureStore.deleteItemAsync("token");
            navigation.navigate("Login");
          }
        }}
      >
        <Icon name="sign-out" type="font-awesome" color="#ffffff" />
      </TouchableOpacity>
    )
  });

  async componentDidMount() {
    // BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);

    this.focusListener = await this.props.navigation.addListener(
      "didFocus",
      async () => {
        var rideID = await SecureStore.getItemAsync("rideID");
        this.setState({ rideID: rideID });
      }
    );
  }

  // componentWillUnmount() {
  //   BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  // }

  handleBackButton() {
    // return true;
    BackHandler.exitApp();
  }

  render() {
    const { navigation } = this.props;

    var self = this;
    return (
      <View style={styles.container}>
        <MapScreen />

        <View style={styles.bottom}>
          {!this.state.rideID && (
            <TouchableOpacity
              title="Scan QR Code"
              onPress={() => navigation.navigate("QRScanner")}
              style={styles.driveBtn}
            >
              <Text style={styles.btnText}>Scan QR Code</Text>
            </TouchableOpacity>
          )}
          {this.state.rideID && (
            <TouchableOpacity
              title="Finish ride"
              onPress={() => this.finishRide(self.state.rideID)}
              style={styles.finishDriveBtb}
            >
              <Text style={styles.btnText}>Stop</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

  async getDriveID() {
    try {
      //await AsyncStorage.setItem("pera", "I like to save it.");
      //const rideID = await AsyncStorage.getItem("rideID");
      var rideID = await SecureStore.getItemAsync("rideID");
      return rideID;
    } catch (e) {
      alert(`Error reading data: ${e}`);
    }
  }

  async finishRide(rideID) {
    let token = await SecureStore.getItemAsync("token");
    try {
      let response = await fetch(
        "https://47817401.ngrok.io/api/v1/user/ride/stop",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            rideID: rideID
          })
        }
      );

      // alert(JSON.stringify(response));

      let responseJson = await response.json();

      alert(
        `Duration: ${responseJson.time} minute(s)\nCost: ${responseJson.cost}`
      );
      this.setState({ rideID: undefined });
      await SecureStore.deleteItemAsync("rideID");
    } catch (error) {
      alert(`GRESKA: ${error}`);
    }
  }
}
