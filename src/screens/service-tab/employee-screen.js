import React from "react";
import { StyleSheet, Text, View, Image, Alert } from "react-native";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

import Input from "./../../components/input";
import CustomButton from "./../../components/button";
import styles from "./styles";

export class EmployeeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleLogout = () => {
    // this.props.navigation.popToTop("Home");
    this.props.navigation.navigate("Home", {});
  };

  render() {
    const { user } = this.props.data;
    const { branch, begindate, workspan } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <View style={styles.label}>
          <View>
            <Text style={styles.content}> {branch} </Text>
          </View>
          <View>
            <Text style={styles.content}>
              {" "}
              {begindate} {" - "} {workspan}{" "}
            </Text>
          </View>
        </View>
        <View style={styles.block}>
          <CustomButton
            title="Finalizar Turno"
            onClick={this.handleLogout}
            size="Normal"
          />
        </View>
      </View>
    );
  }
}

const SHIFT_QUERY = gql`
  {
    user @client
  }
`;

export default graphql(SHIFT_QUERY)(EmployeeScreen);
