/* @flow */
import React, { Component } from "react";
import { Text, View, TextInput } from "react-native";
import styles from "./styles";
import CustomButton from "./../../components/button";

export default class ControlSiteScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      siteName: "Metro Jesus Maria",
      workShift: "14:00 - 18:00",
      employeeName: "Richard Gomez"
    };
  }
  static navigationOptions = {
    title: "Inicio de Turno"
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
          <Text style={styles.content}> {this.state.siteName} </Text>
        </View>
        <View>
          <Text style={styles.title}>Turno:</Text>
        </View>
        <View>
          <Text style={styles.content}> {this.state.workShift} </Text>
        </View>
        <View style={styles.subcontainer}>
          <TextInput style={styles.user} placeholder="Empleado" />
          <CustomButton title="Control" onClick={this.handleButtonClick} />
        </View>
      </View>
    );
  }
}
