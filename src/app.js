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
import { Provider } from "react-redux";
import { client, store } from "./redux/store";

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
        <Provider store={store}>
          <RootSwitch />
        </Provider>
      </ApolloProvider>
    );
  }
}
