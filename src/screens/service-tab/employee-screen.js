/* @flow */
import React from "react";
import { StyleSheet, Text, View, Image, Alert } from "react-native";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

import Input from "./../../components/input";
import CustomButton from "./../../components/button";
import styles from "./styles";

type Props = {};

type State = {};

export default class EmployeeScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  handleLogout = () => {};

  render() {
    return (
      <View style={styles.container}>
        <CustomButton
          title="Cerrar Sesion"
          onClick={this.handleLogout}
          small={false}
        />
      </View>
    );
  }
}
