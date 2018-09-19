/* @flow */
import React from "react";
import { StyleSheet, Text, View, Image, Alert } from "react-native";
import { createSwitchNavigator } from "react-navigation";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

import Input from "./../../components/input";
import CustomButton from "./../../components/button";
import styles from "./styles";

// const FEED_QUERY = gql`
//   {
//     login(userName: "jreyp", password: "jesus") {
//       id
//       firstName
//       lastName
//     }
//   }
// `;

type Props = {};

type State = {
  user: string,
  password: string
};

export default class LoginScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      user: "",
      password: ""
    };
  }

  handleUser = (text: string) => {
    this.setState({ user: text });
  };

  handlePassword = (text: string) => {
    this.setState({ password: text });
  };

  handleButtonClick = () => {
    if (!this.state.user) {
      Alert.alert("Login Error", "Debe ingresar un nombre de usuario");
    } else {
      this.props.navigation.navigate("Home", {
        userName: this.state.user
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("./../../images/logo2.png")}
        />
        <Input
          placeholder={"Usuario"}
          handleInput={this.handleUser}
          secure={false}
        />
        <Input
          placeholder={"Contraseña"}
          handleInput={this.handlePassword}
          secure={true}
        />
        <CustomButton
          title="Iniciar"
          onClick={this.handleButtonClick}
          small={false}
        />
      </View>
    );
  }
}
