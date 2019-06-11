import { Dimensions, StyleSheet } from "react-native";

let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    width: width,
    height: height,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10
  },
  menu: {
    flex: 1,
    backgroundColor: "#FFF",
    position: "absolute",
    left: 0,
    top: 0,
    width: width * 0.8,
    height: height,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10
  },
  menuItem: {
    paddingTop: 10
  }
}));
