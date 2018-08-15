// @flow
import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

import styles from "./styles";

type Props = {
  placeholder: string,
  secure: boolean,
  handleInput: string => void
};

export default class Input extends React.Component<Props> {
  render() {
    return (
      <TextInput
        style={styles.input}
        onChangeText={this.props.handleInput}
        placeholder={this.props.placeholder}
        autoCapitalize="none"
        secureTextEntry={this.props.secure}
      />
    );
  }
}
