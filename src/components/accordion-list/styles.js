/* @flow */

import { StyleSheet } from "react-native";

import { COLOR_SECONDARY, FONT_NORMAL } from "./../../common";

export default StyleSheet.create({
  container: {
    backgroundColor: COLOR_SECONDARY,
    justifyContent: "space-around",
    margin: 15,
    borderRadius: 10
  },
  header: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "500",
    fontFamily: FONT_NORMAL,
    margin: 10
  }
});
