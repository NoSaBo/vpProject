/* @flow */

import { StyleSheet } from "react-native";

import { FONT_NORMAL } from "./../../common";

export default StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    flex: 1,
    padding: 5
  },
  textContainer: {
    flex: 1
  },
  left: {
    textAlign: "left",
    fontSize: 24,
    fontWeight: "500",
    fontFamily: FONT_NORMAL
  },
  right: {
    textAlign: "right",
    fontSize: 20,
    fontWeight: "500",
    fontFamily: FONT_NORMAL
  }
});
