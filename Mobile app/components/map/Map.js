import * as SecureStore from "expo-secure-store";
import * as React from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker, Polygon } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
export default class MapScreen extends React.Component {
  bikeIcon = require("../../assets/images/marker_bike.png");
  motorIcon = require("../../assets/images/marker_motor.png");
  scooterIcon = require("../../assets/images/marker_scooter.png");
  carIcon = require("../../assets/images/marker_car.png");
  state = {
    region: {
      latitude: 45.256896,
      longitude: 19.835144,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    },
    userPosition: null,
    directions: null,
    destinationPin: null,
    markers: []
  };

  async componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        userPosition: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
      });
    });
    let token = await SecureStore.getItemAsync("token");
    let response = await fetch(
      "https://47817401.ngrok.io/api/v1/user/vehicles",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
        }
      }
    );

    let responseJson = await response.json();
    let vehicles = [];
    for (let vehicle of responseJson.data) {
      let icon;
      switch (vehicle.type) {
        case "scooter":
          icon = this.scooterIcon;
          break;
        case "bike":
          icon = this.bikeIcon;
          break;
        case "motor":
          icon = this.motorIcon;
          break;
        case "car":
          icon = this.carIcon;
          break;
        default:
        // code block
      }
      vehicles.push(
        <Marker
          coordinate={{ latitude: vehicle.lat, longitude: vehicle.long }}
          title={vehicle.type}
          description={"battery: " + vehicle.battery + "%"}
          image={icon}
          key={vehicle.id}
          onPress={this.onVehicleClick.bind(this)}
        />
      );
    }
    this.setState({ markers: vehicles });
  }
  onRegionChange(region) {
    this.setState({ region });
  }
  onVehicleClick(event) {
    let destination = event.nativeEvent.coordinate;
    let newDirections = (
      <MapViewDirections
        origin={{
          latitude: this.state.userPosition.latitude,
          longitude: this.state.userPosition.longitude
        }}
        destination={{
          latitude: destination.latitude,
          longitude: destination.longitude
        }}
        apikey={"AIzaSyDpkdkoT6BQQxP6KufCiPCi36Fj0Q5qXAU"}
        strokeWidth={3}
        strokeColor="hotpink"
      />
    );
    this.setState({ directions: newDirections });
  }
  async onClick(event) {
    let destination = event.nativeEvent.coordinate;

    await this.setState({
      destinationPin: (
        <Marker
          coordinate={destination}
          title={"Destination"}
          image={require("../../assets/images/flag.png")} // + marker.icon)}
        />
      )
    });
    //this.setState(directions: )
    //navigator.geolocation = require('@react-native-community/geolocation');
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          userPosition: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        });
        let destination = this.state.destinationPin.props.coordinate;
        let newDirections = (
          <MapViewDirections
            origin={{
              latitude: this.state.userPosition.latitude,
              longitude: this.state.userPosition.longitude
            }}
            destination={{
              latitude: destination.latitude,
              longitude: destination.longitude
            }}
            apikey={"AIzaSyDpkdkoT6BQQxP6KufCiPCi36Fj0Q5qXAU"}
            strokeWidth={3}
            strokeColor="hotpink"
          />
        );
        this.setState({ directions: newDirections });
      },
      err => {
        alert(err.message);
      }
    );

    //console.log(this.state.userPosition.latitude)
    //let newDirections = <MapViewDirections

    //origin={{latitude: this.state.userPosition.latitude, longitude: this.state.userPosition.longitude}}
    //destination={{latitude: destination.latitude, longitude: destination.longitude}}
    //apikey={"AIzaSyC93WUUCSpazgjnnXlzOd7fO_8NwTpzrDA"}
    //strokeWidth={3}
    //strokeColor="hotpink"
    ///>
    //this.setState({directions : newDirections})
  }
  render() {
    return (
      //<MapView style={styles.map}
      //initialRegion={this.state.region}
      // onRegionChange={this.onRegionChange.bind(this)}
      // />
      <MapView
        style={styles.map}
        showsUserLocation={true}
        followsUserLocation={true}
        initialRegion={this.state.region}
        onRegionChange={this.onRegionChange.bind(this)}
        onPress={this.onClick.bind(this)}
      >
        {this.state.markers}
        {this.state.destinationPin}
        {this.state.directions}
        <Polygon
          coordinates={[
            { latitude: 45.248649, longitude: 19.852651 },
            { latitude: 45.246654, longitude: 19.853852 },
            { latitude: 45.244932, longitude: 19.855096 },
            { latitude: 45.240823, longitude: 19.853337 },
            { latitude: 45.236804, longitude: 19.846173 },
            { latitude: 45.240702, longitude: 19.843257 },
            { latitude: 45.247803, longitude: 19.839481 },
            { latitude: 45.251035, longitude: 19.850677 },
            { latitude: 45.24883, longitude: 19.852522 }
          ]}
          strokeWidth={2}
          strokeColor={"#66FF66"}
          fillColor={"rgba(204, 255, 204, 0.3)"}
        />
      </MapView>
    );
  }
}
const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%"
  }
});
