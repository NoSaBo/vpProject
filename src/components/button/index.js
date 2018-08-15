/* @flow */
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import styles from "./styles";

type Props = {
  title: string,
  onClick: void => void
};

export default class CustomButton extends React.Component<Props> {
  render() {
    return (
      <TouchableOpacity style={styles.button} onPress={this.props.onClick}>
        <Text style={styles.text}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}
