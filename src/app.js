import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard
} from "react-native";
import { ApolloProvider } from "react-apollo";
import { client } from "./apollo/client";

import RootSwitch from "./routes";

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
