/* @flow */
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import styles from "./styles";

type Props = {
  title: string,
  date: string
};

export default class AccordionHeader extends React.Component<Props> {
  render() {
    return (
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.left}> > </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.left}> {this.props.title} </Text>
        </View>
        <View>
          <Text style={styles.right}>{this.props.date}</Text>
        </View>
      </View>
    );
  }
}
