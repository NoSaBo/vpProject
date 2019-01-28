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
  block: {
    // height: 320,
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
  modal: {
    width: 300,
    height: 260,
    borderRadius: 10,
    borderWidth: 0,
    backgroundColor: COLOR_BASE,
    alignItems: "center",
    justifyContent: "center",
    padding: 10
  },
  access: {
    height: 170,
    backgroundColor: COLOR_BASE,
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
    borderRadius: 10,
    borderWidth: 0,
    borderColor: COLOR_BASE,
    padding: 6
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: FONT_NORMAL,
    color: FONT_COLOR,
    padding: 5,
    marginTop: 10
  },
  content: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: FONT_NORMAL,
    color: FONT_COLOR
  },
  green: {
    fontSize: 18,
    color: "green",
    fontWeight: "400",
    fontFamily: FONT_NORMAL,
    padding: 5,
    marginTop: 25
  },
  red: {
    fontSize: 18,
    color: "red",
    fontWeight: "400",
    fontFamily: FONT_NORMAL,
    padding: 5,
    marginTop: 25
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 15
  },
  preview: {
    // width: 335,
    // height: 114,
    flex: 1,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15
  },
  previewText: {
    color: "#FFF",
    fontSize: 14,
    height: 40,
    lineHeight: 40,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#69B2FF",
    width: 120,
    textAlign: "center",
    marginTop: 10
  }
});
