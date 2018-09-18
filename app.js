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

import { createSwitchNavigator, createStackNavigator } from "react-navigation";

import LoginScreen from "./src/screens/login-screen/index";
import HomeScreen from "./src/screens/home-screen/index";
import ControlSiteScreen from "./src/screens/controlSite-screen/index";
import ControlPhotoScreen from "./src/screens/controlSite-screen/authentication";

const ControlStack = createStackNavigator({
  Home: { screen: HomeScreen },
  Site: ControlSiteScreen,
  Photo: ControlPhotoScreen
});

const RootSwitch = createSwitchNavigator(
  {
    Control: ControlStack,
    Login: { screen: LoginScreen }
  },
  {
    initialRouteName: "Login"
  }
);

import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const httpLink = createHttpLink({
  // uri: "http://localhost:4000/graphql"
  uri: "http://vp-project.herokuapp.com/graphql"
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <ApolloProvider client={client}>
        <RootSwitch />
      </ApolloProvider>
    );
  }
}
