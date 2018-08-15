/* @flow */
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import CustomButton from "./../../components/button";

import styles from "./styles";

type Props = {
  address: string,
  begin: string,
  end: string
};

export default class accordionContent extends React.Component<Props> {
  handleService = () => {};

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.text}> {this.props.address} </Text>
        </View>
        <View>
          <Text style={styles.text}>
            {this.props.begin} - {this.props.end}
          </Text>
        </View>
        <View>
          <CustomButton title="Iniciar turno" onClick={this.handleService} />
        </View>
      </View>
    );
  }
}
