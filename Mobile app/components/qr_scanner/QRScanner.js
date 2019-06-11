import { BarCodeScanner } from "expo-barcode-scanner";
import * as Permissions from "expo-permissions";
import * as SecureStore from "expo-secure-store";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  ToastAndroid,
  View
} from "react-native";

export default class QRScanner extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
    isLoading: true
  };

  static navigationOptions = {
    title: "QR Code Scanner"
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === "granted"
    });
  }

  render() {
    // const { navigation } = this.props;

    const { hasCameraPermission, scanned, isLoading } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        {scanned && isLoading && (
          <View style={{ flex: 1, padding: 20 }}>
            <ActivityIndicator />
          </View>
        )}
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {/* {scanned && (
          <Button
            title={"Tap to Scan Again"}
            onPress={() => this.setState({ scanned: false })}
          />
        )} */}
      </View>
    );
  }

  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({ scanned: true });
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    await this.sendCode(data);

    //alert(`2Bar code with type ${type} and data ${data} has been scanned!`);
  };

  async sendCode(code) {
    const { navigation } = this.props;
    try {
      let token = await SecureStore.getItemAsync("token");
      let response = await fetch(
        "https://47817401.ngrok.io/api/v1/user/ride/start",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            vehicleID: code
          })
        }
      );

      let responseJson = await response.json();
      this.setState({ isLoading: false });

      ToastAndroid.show(
        `Vehicle ${code} started at ${new Date().toLocaleString()}`,
        ToastAndroid.SHORT
      );
      //alert(`Vehicle ${code} started at ${new Date().toLocaleString()}`);
      var driveID = responseJson.data.id.toString();
      await SecureStore.setItemAsync("rideID", driveID);

      navigation.goBack();
    } catch (error) {
      alert(`GRESKA: ${error}`);
    }
  }
}
