/* @flow */

import { StyleSheet } from "react-native";

import { FONT_NORMAL, COLOR_SECONDARY } from "./../../common";

export default StyleSheet.create({
  input: {
    backgroundColor: "white",
    padding: 12,
    fontSize: 22,
    width: 240,
    height: 50,
    margin: 5,
    fontFamily: FONT_NORMAL,
    borderRadius: 10,
    borderWidth: 0.2,
    borderColor: COLOR_SECONDARY
  }
});
