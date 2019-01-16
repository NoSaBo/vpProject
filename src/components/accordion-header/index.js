import React from "react";
import { StyleSheet, Text, View } from "react-native";
import moment from "moment";
import "moment/locale/es";

import styles from "./styles";

export default class AccordionHeader extends React.Component {
  render() {
    const shiftDate = new Date(this.props.date);
    return (
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.left}> > </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.left}> {this.props.name} </Text>
        </View>
        <View>
          <Text style={styles.right}>
            {moment(shiftDate).format("ddd DD MMM")}
          </Text>
        </View>
      </View>
    );
  }
}
