/* @flow */
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import styles from "./styles";

type Props = {
  title: string,
  small: boolean,
  onClick: void => void
};

export default class CustomButton extends React.Component<Props> {
  render() {
    const but = "button";
    const text = "text";
    return (
      <TouchableOpacity
        style={styles[but.concat(this.props.size)]}
        onPress={this.props.onClick}
      >
        <Text style={styles[text.concat(this.props.size)]}>
          {this.props.title}
        </Text>
      </TouchableOpacity>
    );
  }
}
