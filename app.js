/* @flow */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard
} from "react-native";

import { createSwitchNavigator, SwitchNavigator, StackNavigator } from "react-navigation";

import LoginScreen from "./src/screens/login-screen/index";
import HomeScreen from "./src/screens/home-screen/index";
import ControlSiteScreen from "./src/screens/controlSite-screen/index";
import ControlPhotoScreen from "./src/screens/controlPhoto-screen/index";
      
      
const ControlStack = StackNavigator(
  {
    Home: HomeScreen, 
    Site: ControlSiteScreen, 
    Photo: ControlPhotoScreen
  }
);

const RootSwitch = SwitchNavigator(
  {
    Control: ControlStack,
    Login: { screen: LoginScreen },
    // Photo: { screen: ControlPhotoScreen },
  },
  {
    initialRouteName: "Login",
  }
);

type Props = {};

export default class App extends Component<Props> {
  render() {
    return <RootSwitch />;
  }
}
