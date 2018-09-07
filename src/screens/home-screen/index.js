/* @flow */
import React from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { createSwitchNavigator } from "react-navigation";

import Input from "./../../components/input";
import CustomButton from "./../../components/button";
import AccordionList from "./../../components/accordion-list";

import styles from "./styles";


type Props = {
  user: string,
};

type State = {};

export default class HomeScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: "Bienvenido: " + `${navigation.state.params.user}`,
    }
  }

  handleLogout = () => {
    this.props.navigation.navigate("Login");
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {/* <View>
            <Text style={styles.welcome}> Bienvenido {this.props.user} </Text>
          </View> */}
          <View>
            <CustomButton title="Cerrar Sesión" onClick={this.handleLogout} />
          </View>
          <View>
            <AccordionList />
          </View>
        </ScrollView>
      </View>
    );
  }
}
