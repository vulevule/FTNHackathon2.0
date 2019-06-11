import React, { Component } from "react";
import { Text, TouchableHighlight } from "react-native";
import styles from "./MenuOverlayStyle";

export default class MenuOverlay extends Component {
  render() {
    return (
      <TouchableHighlight
        onPress={() => {
          this.props.onToggleMenu();
        }}
        style={styles.overlay}
      >
        <Text />
      </TouchableHighlight>
    );
  }
}
