import React, { Component } from "react";
import {
  createSwitchNavigator,
  createStackNavigator,
  createMaterialTopTabNavigator
} from "react-navigation";

import LoginScreen from "./screens/login-screen/index";
import HomeScreen from "./screens/home-screen/index";
import ControlSiteScreen from "./screens/controlSite-screen/index";
import ServiceScreen from "./screens/service/index";
import RegisterScreen from "./screens/register-car/index";
import ReturnScreen from "./screens/return-car/index";

import { COLOR_PRIMARY, COLOR_BASE } from "./common";

// Service Routes
const ServiceStack = createStackNavigator(
  {
    Service: ServiceScreen,
    Register: RegisterScreen,
    Return: ReturnScreen
  },
  {
    initialRouteName: "Service",
    headerMode: "none"
  }
);

// Control Routes
const ControlStack = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Site: ControlSiteScreen,
    ServiceStack: ServiceStack
  },
  {
    initialRouteName: "Home",
    headerMode: "none"
  }
);

// Main Routes
const RootSwitch = createSwitchNavigator(
  {
    Control: ControlStack,
    Login: { screen: LoginScreen }
  },
  {
    initialRouteName: "Login"
  }
);

export default RootSwitch;
