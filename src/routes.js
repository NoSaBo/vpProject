import React, { Component } from "react";
import {
  createSwitchNavigator,
  createStackNavigator,
  createMaterialTopTabNavigator
} from "react-navigation";

import LoginScreen from "./screens/login-screen/index";
import HomeScreen from "./screens/home-screen/index";
import ControlSiteScreen from "./screens/controlSite-screen/index";
import EmployeeScreen from "./screens/service-tab/employee-screen";
import ServiceScreen from "./screens/service-tab/service-screen";
import RegisterScreen from "./screens/register-car/index";
import ReturnScreen from "./screens/return-car/index";

import { COLOR_PRIMARY, COLOR_BASE } from "./common";

// Service Routes
const ServiceTabs = createMaterialTopTabNavigator(
  {
    EmployeeTab: {
      screen: EmployeeScreen,
      navigationOptions: {
        title: "Empleados"
      }
    },
    ServiceTab: {
      screen: ServiceScreen,
      navigationOptions: {
        title: "Servicios"
      }
    }
  },
  {
    initialRouteName: "EmployeeTab",
    header: null,
    tabBarOptions: {
      upperCaseLabel: false,
      showIcon: true,
      indicatorStyle: {
        backgroundColor: COLOR_BASE
      },
      activeTintColor: COLOR_BASE,
      inactiveTintColor: "gray",
      labelStyle: {
        fontSize: 20
      },
      style: {
        backgroundColor: COLOR_PRIMARY
      }
    }
  }
);

const ServiceStack = createStackNavigator(
  {
    Service: ServiceTabs,
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
