/* @flow */

import { StyleSheet } from "react-native";

import {
  COLOR_BASE,
  COLOR_SECONDARY,
  FONT_NORMAL,
  FONT_COLOR
} from "./../../common";

export default StyleSheet.create({
  container: {
    backgroundColor: COLOR_BASE,
    justifyContent: "space-around",
    margin: 15,
    borderRadius: 10
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: FONT_COLOR,
    fontFamily: FONT_NORMAL
  }
});
