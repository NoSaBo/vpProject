/* @flow */

import { StyleSheet } from "react-native";

import { FONT_NORMAL, COLOR_SECONDARY, COLOR_PRIMARY } from "./../../common";

export default StyleSheet.create({
  container: {
    color: COLOR_PRIMARY,
    fontSize: 22,
    fontWeight: "400",
    fontFamily: FONT_NORMAL,
    padding: 5,
    alignItems: "center",
    justifyContent: "center"
    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10,
    // borderWidth: 0.3,
    // borderColor: COLOR_SECONDARY
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: FONT_NORMAL
  }
});
