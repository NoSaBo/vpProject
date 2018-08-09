// @flow
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import styles from '../style'

export default class BoxButton extends React.Component {

  render() {
    return (
      <TouchableOpacity
        style={styles.boxbutton}
        onPress={this.props.onClick}
        title={this.props.title}
        // disable={this.props.disable}
      >
        <Text
          style={styles.buttontext}
          >
            {this.props.title}
          </Text>
      </TouchableOpacity>
    );
  }
}
