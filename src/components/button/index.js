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
    return (
      <TouchableOpacity
        style={this.props.small ? styles.buttonSmall : styles.buttonNormal}
        onPress={this.props.onClick}
      >
        <Text style={this.props.small ? styles.textSmall : styles.textNormal}>
          {this.props.title}
        </Text>
      </TouchableOpacity>
    );
  }
}
