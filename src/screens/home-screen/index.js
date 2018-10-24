/* @flow */
import React from "react";
import { View, ScrollView, Text, ActivityIndicator } from "react-native";
import { graphql } from "react-apollo";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import CustomButton from "./../../components/button";
import AccordionList from "./../../components/accordion-list";
import styles from "./styles";
import { COLOR_ALERT, COLOR_SECONDARY, COLOR_BASE } from "./../../common";

type Props = {
  userName: string
};

type State = {};

export class HomeScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = {
    header: null
  };

  handleLogout = () => {
    this.props.navigation.navigate("Login");
  };

  render() {
    const { loading, employee } = this.props.data;
    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={COLOR_BASE} />
        </View>
      );
    }
    if (!employee) {
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}> Error </Text>
          <CustomButton
            title="Volver"
            onClick={this.handleLogout}
            size="Small"
          />
        </View>
      );
    } else {
      const { firstName, lastName } = this.props.data.employee;
      return (
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.user}>
              <View>
                <Text style={styles.welcome}>Bienvenido</Text>
                <Text style={styles.welcome}>
                  {firstName} {lastName}
                </Text>
              </View>
              <View>
                <CustomButton
                  title="Cerrar Sesión"
                  onClick={this.handleLogout}
                  size="Small"
                />
              </View>
            </View>
            <View style={styles.list}>
              <AccordionList
                sections={this.props.data.employee.shifts}
                userName={this.props.navigation.state.params.userName}
              />
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}

const HOME_QUERY = gql`
  query employee($userName: String!) {
    employee(userName: $userName) {
      id
      firstName
      lastName
      shifts {
        id
        date
        begin
        end
        branch {
          branchName
          address
        }
      }
    }
  }
`;

export default graphql(HOME_QUERY, {
  options: props => ({
    variables: { userName: props.navigation.state.params.userName }
  })
})(HomeScreen);
