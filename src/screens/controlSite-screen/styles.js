import { StyleSheet } from "react-native";
import { FONT_NORMAL, COLOR_PRIMARY } from "./../../common";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_PRIMARY,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 24,
    fontWeight: "400",
    fontFamily: FONT_NORMAL,
    padding: 5,
    marginTop: 25,
  },
  content: {
    fontSize: 30,
    fontWeight: "400",
    fontFamily: FONT_NORMAL,
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
    justifyContent: "space-around",
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 15,
  },
});
