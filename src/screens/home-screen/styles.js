/* @flow */

import { StyleSheet } from "react-native";

import { COLOR_PRIMARY } from "./../../common";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_PRIMARY,
    alignItems: "stretch",
    justifyContent: "center"
  },
  welcome: {
    fontSize: 24,
    fontFamily: "Roboto",
    margin: 15
  }
});
