/* @flow */

import { StyleSheet } from "react-native";

import {
  COLOR_BASE,
  COLOR_PRIMARY,
  COLOR_SECONDARY,
  FONT_NORMAL,
  FONT_COLOR
} from "./../../common";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_PRIMARY,
    alignItems: "stretch",
    justifyContent: "center"
  },
  user: {
    flex: 1,
    backgroundColor: COLOR_BASE,
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
    borderRadius: 10,
    borderWidth: 0,
    borderColor: COLOR_BASE,
    padding: 6
  },
  list: {
    flex: 1,
    backgroundColor: COLOR_BASE,
    justifyContent: "center",
    alignItems: "stretch",
    margin: 15,
    borderRadius: 10,
    borderWidth: 0,
    borderColor: COLOR_BASE,
    padding: 6
  },
  welcome: {
    fontSize: 26,
    fontFamily: FONT_NORMAL,
    color: FONT_COLOR
  }
});
