/* @flow */

import { StyleSheet } from "react-native";

import { FONT_NORMAL, COLOR_BASE, COLOR_PRIMARY } from "./../../common";

export default StyleSheet.create({
  buttonSmall: {
    width: 180,
    height: 30,
    backgroundColor: COLOR_PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    borderRadius: 10,
    borderWidth: 0,
    borderColor: COLOR_BASE
  },
  textSmall: {
    color: "white",
    fontSize: 16,
    fontFamily: FONT_NORMAL,
    color: COLOR_BASE
  },
  buttonNormal: {
    width: 300,
    height: 45,
    backgroundColor: COLOR_PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    borderRadius: 10,
    borderWidth: 0,
    borderColor: COLOR_BASE
  },
  textNormal: {
    color: "white",
    fontSize: 22,
    fontFamily: FONT_NORMAL,
    color: COLOR_BASE
  },
  buttonExtraSmall: {
    width: 40,
    height: 30,
    backgroundColor: COLOR_PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    borderRadius: 10,
    borderWidth: 0,
    borderColor: COLOR_BASE
  },
  textExtraSmall: {
    color: "white",
    fontSize: 18,
    fontFamily: FONT_NORMAL,
    color: COLOR_BASE
  },
  buttonLarge: {
    width: 300,
    height: 160,
    backgroundColor: COLOR_PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    borderRadius: 10,
    borderWidth: 0,
    borderColor: COLOR_BASE,
    padding: 10
  },
  textLarge: {
    color: "white",
    fontSize: 30,
    fontFamily: FONT_NORMAL,
    color: COLOR_BASE
  },
});
