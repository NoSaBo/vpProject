import React from "react";
import { StyleSheet, Text, View, Image, Alert } from "react-native";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

import Input from "./../../components/input";
import CustomButton from "./../../components/button";
import styles from "./styles";

export default class ServiceScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleRegister = () => {
    this.props.navigation.navigate("Register");
  };

  handleReturn = () => {};

  render() {
    return (
      <View style={styles.container}>
        <CustomButton
          title="Registrar Vehiculo"
          onClick={this.handleRegister}
          size="Large"
        />
        <CustomButton
          title="Devolver Vehiculo"
          onClick={this.handleReturn}
          size="Large"
        />
      </View>
    );
  }
}
