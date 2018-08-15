/* @flow */

import { StyleSheet } from "react-native";

import { COLOR_PRIMARY } from "./../../common";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_PRIMARY,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width: 200,
    height: 150,
    margin: 10
  }
});
