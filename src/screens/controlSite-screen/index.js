/* @flow */

import React, { Component } from "react";
import { Text, View, TextInput, ActivityIndicator } from "react-native";
import { graphql } from "react-apollo";
import { gql } from "apollo-boost";
import styles from "./styles";
import CustomButton from "./../../components/button";

const SITE_QUERY = gql`
  query serviceShift($id: Int!) {
    serviceShift(id: $id) {
      begin
      end
      branch {
        branchName
        latitude
        longitude
      }
    }
  }
`;

type Props = {};

type State = {};

export class ControlSiteScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = {
    title: "Inicio de Turno"
  };

  handleButtonClick = () => {
    this.props.navigation.navigate("Photo");
  };

  render() {
    const { loading, error } = this.props.data;
    if (loading)
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    else {
      const { begin, end } = this.props.data.serviceShift;
      const { branchName } = this.props.data.serviceShift.branch;
      return (
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>Sede:</Text>
          </View>
          <View>
            <Text style={styles.content}> {branchName} </Text>
          </View>
          <View>
            <Text style={styles.title}>Turno:</Text>
          </View>
          <View>
            <Text style={styles.content}>
              {" "}
              {begin} {" - "} {end}{" "}
            </Text>
          </View>
          <View style={styles.subcontainer}>
            <TextInput style={styles.user} placeholder="Username" />
            <CustomButton title="Acceder" onClick={this.handleButtonClick} />
          </View>
        </View>
      );
    }
  }
}

export default graphql(SITE_QUERY, {
  options: props => ({
    variables: { id: props.navigation.state.params.id }
  })
})(ControlSiteScreen);
