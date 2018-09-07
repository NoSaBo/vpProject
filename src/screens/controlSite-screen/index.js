/* @flow */

import React, { Component } from "react";
import { Text, View, TextInput } from "react-native";
import styles from "./styles";
import CustomButton from "./../../components/button";


export default class ControlSiteScreen extends React.Component {
  static navigationOptions = {
    title: 'Control de Sede y Turno',  
  };

    handleButtonClick = () => {
        this.props.navigation.navigate("Photo");
      };

    render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Sede:</Text>
        </View>
        <View>
          <Text style={styles.content}>[ Sede ]</Text>
        </View>
        <View>
          <Text style={styles.title}>Turno:</Text>
        </View>
        <View>
          <Text style={styles.content}>[ Horario ]</Text>
        </View>
        <View style={styles.subcontainer}>
          <TextInput style={styles.user} placeholder="Usuario" />
          <CustomButton title="Control" onClick={this.handleButtonClick} />
        </View>
      </View>
    );
  }
}
