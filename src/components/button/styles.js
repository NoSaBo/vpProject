/* @flow */

import { StyleSheet } from "react-native";

import { FONT_NORMAL } from "./../../common";

export default StyleSheet.create({
  button: {
    width: 300,
    height: 45,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    borderRadius: 10,
    borderWidth: 0,
    borderColor: "white"
  },
  text: {
    color: "white",
    fontSize: 22,
    fontFamily: FONT_NORMAL
  }
});
