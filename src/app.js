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
import { ApolloProvider } from "react-apollo";
import { client } from "./apollo/client";

import RootSwitch from "./routes";

type Props = {};

type State = {};

export default class App extends Component<Props, State> {
  constructor(props: Props) {
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
