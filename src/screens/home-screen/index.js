/* @flow */
import React from "react";
import {
  AsyncStorage,
  View,
  ScrollView,
  Text,
  ActivityIndicator
} from "react-native";
import { graphql } from "react-apollo";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import CustomButton from "./../../components/button";
import AccordionList from "./../../components/accordion-list";
import styles from "./styles";
import { COLOR_ALERT, COLOR_SECONDARY, COLOR_BASE } from "./../../common";

export class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async removeItemValue(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (exception) {
      return false;
    }
  }

  handleLogout = () => {
    if (this.removeItemValue("user")) this.props.navigation.navigate("Login");
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
          <Text style={styles.welcome}> Error de inicio de sesión </Text>
          <CustomButton
            title="Volver"
            onClick={this.handleLogout}
            size="Small"
          />
        </View>
      );
    } else {
      const { firstname, lastname } = this.props.data.employee;
      return (
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.user}>
              <View>
                <Text style={styles.welcome}>Bienvenido</Text>
                <Text style={styles.welcome}>
                  {firstname} {lastname}
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
                user={this.props.navigation.state.params.user}
              />
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}

const HOME_QUERY = gql`
  query employee($user: String!) {
    employee(user: $user) {
      id
      firstname
      lastname
      shifts {
        id
        begindate
        workspan
        active
        branch {
          branch
          address
        }
      }
    }
  }
`;

export default graphql(HOME_QUERY, {
  options: props => ({
    variables: { userName: props.navigation.state.params.user }
  })
})(HomeScreen);
