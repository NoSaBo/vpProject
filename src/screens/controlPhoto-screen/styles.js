/* @flow */

import { StyleSheet } from 'react-native';
import { FONT_NORMAL, COLOR_PRIMARY } from "./../../common"; 

export default StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: COLOR_PRIMARY,
      alignItems: "center",
    },
    image: {
      width: 150,
      height: 150,
      marginTop: 50,
      marginBottom: 15,
    },
    title: {
        color: "black",
        fontSize: 24,
        fontWeight: "400",
        fontFamily: FONT_NORMAL,
        padding: 5,
        marginTop: 25,
        marginLeft: 15,
      },
    content: {
        fontSize: 16,
        fontWeight: "500",
        fontFamily: FONT_NORMAL,
        margin: 5,
        marginLeft: 30,
      },
  });