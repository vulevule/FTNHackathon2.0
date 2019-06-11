import colors from "../../util/colors";
import { normalize } from "../../util/sizes";

export default {
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center"
  },
  bottom: {
    position: "absolute",
    bottom: 30
  },
  driveBtn: {
    borderWidth: 1,
    borderColor: "rgba(53, 120, 74,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 50,
    backgroundColor: colors.green,
    fontSize: normalize(10),
    borderRadius: 50
  },
  finishDriveBtb: {
    borderWidth: 1,
    borderColor: "rgba(	206, 32, 41,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    backgroundColor: "#ce2029",
    borderRadius: 50
  },
  btnText: {
    fontSize: normalize(20),
    color: "#ffffff"
  }
};
