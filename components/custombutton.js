// @flow
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import styles from "../style";

export default class CustomButton extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.custombutton}
        onPress={this.props.onClick}
        title={this.props.title}
      >
        <Text style={styles.buttontext}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}
