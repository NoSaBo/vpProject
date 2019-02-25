import {
  COLOR_ALERT,
  COLOR_SECONDARY,
  COLOR_BASE,
  COLOR_PRIMARY,
  FONT_NORMAL
} from "./common";
import { getCenter } from "geolib";

const theme = {
  Button: {
    raised: true,
    containerStyle: {
      margin: 10,
      justifyContent: "center",
      alignItems: "center"
    },
    buttonStyle: {
      backgroundColor: COLOR_PRIMARY,
      borderRadius: 10,
      borderColor: COLOR_BASE,
      paddingHorizontal: 50
    },
    titleStyle: {
      fontSize: 15
    }
  },
  Input: {
    shake: true,
    containerStyle: {
      justifyContent: "center",
      alignItems: "center"
    },
    inputContainerStyle: {
      borderBottomWidth: 0,
      backgroundColor: "white",
      width: 240,
      margin: 5,
      borderRadius: 10
    },
    inputStyle: {
      fontFamily: FONT_NORMAL
    }
  },
  Card: {
    containerStyle: {
      backgroundColor: COLOR_BASE,
      borderRadius: 10,
      borderColor: COLOR_BASE
    },
    wrapperStyle: {
      //   justifyContent: "flex-start",
      //   alignItems: "flex-start"
      justifyContent: "center",
      alignItems: "center"
    }
  },
  Icon: {
    containerStyle: {
      marginHorizontal: 5
    },
    size: 20
  },
  ListItem: {
    containerStyle: {
      backgroundColor: COLOR_BASE,
      borderColor: COLOR_PRIMARY,
      borderLeftWidth: 3,
      borderRadius: 3,
      justifyContent: "space-around",
      alignItems: "stretch"
    },
    titleStyle: {
      fontSize: 16
      // fontWeight: "bold"
    },
    subtitleStyle: {},
    rightSubtitleStyle: {
      fontSize: 14
      // fontWeight: "bold"
    },
    rightTitleStyle: {
      fontSize: 16
      // fontWeight: "bold"
    }
  }
};

export default theme;
