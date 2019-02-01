import React, { Component } from "react";
import { ThemeProvider } from "react-native-elements";
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

const theme = {
  Button: {
    raised: true
  }
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <RootSwitch />
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}
