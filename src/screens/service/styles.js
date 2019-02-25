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
    backgroundColor: COLOR_BASE,
    alignItems: "center",
    justifyContent: "center"
  },
  label: {
    flex: 1,
    backgroundColor: COLOR_BASE,
    justifyContent: "center",
    alignItems: "center",
    // borderRadius: 10,
    // borderWidth: 0,
    borderColor: COLOR_BASE
  },
  block: {
    flex: 2,
    backgroundColor: COLOR_BASE,
    justifyContent: "flex-start",
    alignItems: "center",
    borderColor: COLOR_BASE
  },
  table: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
    fontFamily: FONT_NORMAL,
    color: FONT_COLOR,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: COLOR_PRIMARY,
    padding: 10
  },
  content: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: FONT_NORMAL,
    color: FONT_COLOR,
    marginRight: 25,
    padding: 5
  }
});
