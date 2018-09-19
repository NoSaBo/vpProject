/* @flow */

import { StyleSheet } from "react-native";

import { FONT_NORMAL, FONT_COLOR, COLOR_SECONDARY } from "./../../common";

export default StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    flex: 1,
    marginTop: 10,
    padding: 5
    // borderRadius: 10,
    // borderWidth: 0.3,
    // borderColor: COLOR_SECONDARY
  },
  textContainer: {
    flex: 1
  },
  left: {
    textAlign: "left",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: FONT_NORMAL,
    color: FONT_COLOR
  },
  right: {
    textAlign: "right",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: FONT_NORMAL,
    color: FONT_COLOR
  }
});
