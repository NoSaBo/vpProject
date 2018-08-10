/**
 * base styles sheet
 */

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center"
  },
  login: {
    flex: 1,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center"
  },
  loginimage: {
    width: 200,
    height: 150,
    margin: 10
  },
  input: {
    backgroundColor: "white",
    padding: 12,
    fontSize: 22,
    width: 240,
    height: 50,
    margin: 5,
    fontFamily: "Roboto"
  },
  custombutton: {
    width: 300,
    height: 45,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    margin: 20
  },
  buttontext: {
    color: "white",
    fontSize: 22,
    fontFamily: "Roboto"
  }
});
