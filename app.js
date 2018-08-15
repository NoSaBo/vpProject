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
import { createSwitchNavigator } from "react-navigation";

import LoginScreen from "./src/screens/login-screen/index";
import HomeScreen from "./src/screens/home-screen/index";

const RootSwitch = createSwitchNavigator(
  {
    Login: { screen: LoginScreen },
    Home: { screen: HomeScreen }
  },
  {
    initialRouteName: "Login"
  }
);

type Props = {};

export default class App extends Component<Props> {
  render() {
    return <RootSwitch />;
  }
}
