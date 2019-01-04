import React from "react";
import { StyleSheet, Text, View } from "react-native";

import styles from "./styles";

export default class AccordionHeader extends React.Component {
  render() {
    return (
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.left}> > </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.left}> {this.props.name} </Text>
        </View>
        <View>
          <Text style={styles.right}>{this.props.date}</Text>
        </View>
      </View>
    );
  }
}
