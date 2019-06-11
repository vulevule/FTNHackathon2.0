import { normalize } from "../../util/sizes";

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10
  },
  loginBtn: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: 50,
    //backgroundColor: "#ffffff",
    fontSize: normalize(20),
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10
  },
  loginText: {
    fontSize: normalize(20)
  },
  bottomButtons: {
    flexWrap: "wrap",
    //alignItems: "flex-start",
    flexDirection: "row"
  }
};

export default styles;
