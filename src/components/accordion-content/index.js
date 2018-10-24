/* @flow */
import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import CustomButton from "./../../components/button";

import styles from "./styles";
// navigation
import { withNavigation } from "react-navigation";

type Props = {
  address: string,
  begin: string,
  end: string
};

class accordionContent extends React.Component<Props> {
  handleService = () => {
    this.props.navigation.navigate("Site", {
      id: this.props.id
    });
  };

  render() {
    const { address, begin, end } = this.props;
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.text}> {address} </Text>
        </View>
        <View>
          <Text style={styles.text}>
            {begin} - {end}
          </Text>
        </View>
        <View>
          <CustomButton
            title="Iniciar turno"
            onClick={this.handleService}
            size="Small"
          />
        </View>
      </View>
    );
  }
}

export default withNavigation(accordionContent);
