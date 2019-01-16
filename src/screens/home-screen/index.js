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
    const { loading, employees } = this.props.data;
    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={COLOR_BASE} />
        </View>
      );
    }
    if (!employees[0]) {
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
      const { firstname, lastname } = this.props.data.employees[0];
      const user = this.props.navigation.state.params.user;
      const sections = this.props.data.employees[0].shifts;
      // const sections = this.props.data.employees[0].shifts.map(shift => {
      //   shift.begindate = new Date(shift.begindate);
      //   shift.workspan = new Date(shift.workspan);
      // });
      // sections.sort(function(a, b) {
      //   return a.begindate.getTime() - b.begindate.getTime();
      // });
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
              <AccordionList sections={sections} user={user} />
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}

const HOME_QUERY = gql`
  query employees($user: String!) {
    employees(user: $user) {
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
    variables: { user: props.navigation.state.params.user },
    fetchPolicy: "cache-and-network"
  })
})(HomeScreen);
