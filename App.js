// @flow
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Login from "./components/login";

import styles from "./style";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Login />
      </View>
    );
  }
}
