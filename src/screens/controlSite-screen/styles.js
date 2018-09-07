import { StyleSheet } from "react-native";
import { FONT_NORMAL, COLOR_PRIMARY } from "./../../common";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_PRIMARY,
    alignItems: "flex-start",
  },
  title: {
    fontSize: 24,
    fontWeight: "400",
    fontFamily: FONT_NORMAL,
    padding: 5,
    marginTop: 25,
    marginLeft: 15,
  },
  content: {
    fontSize: 30,
    fontWeight: "400",
    fontFamily: FONT_NORMAL,
    marginLeft: 30,
  },
  user: {
    width: 250,
    fontSize: 24,
    fontWeight: "400",
    fontFamily: FONT_NORMAL,
    padding: 5,
    textAlign: 'center',
    borderBottomWidth: 1,
    alignSelf: 'center',

  },
  subcontainer: {
    marginTop: 60,
    height: 200,
    alignSelf: 'center',
    justifyContent: 'space-between',
  }
});
