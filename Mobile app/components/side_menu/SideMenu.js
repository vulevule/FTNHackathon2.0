import React from "react";
import { Text, View } from "react-native";
// import MenuList from "./containers/MenuList";
import MenuOverlay from "./MenuOverlay";
import styles from "./SideMenuStyle";

export default class SideMenu extends React.Component {
  render() {
    let { navigation, onToggleMenu } = this.props;

    return (
      <View style={styles.container}>
        <MenuOverlay onToggleMenu={onToggleMenu} navigation={navigation} />
        <View style={styles.menu}>
          {/* <MenuList onToggleMenu={onToggleMenu} navigation={navigation} /> */}
          <Text>Teeeeest</Text>
        </View>
      </View>
    );
  }
}
