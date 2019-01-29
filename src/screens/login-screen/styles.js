/* @flow */

import { StyleSheet } from "react-native";

import { COLOR_BASE } from "./../../common";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_BASE,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width: 150,
    height: 175,
    margin: 10
  }
});
