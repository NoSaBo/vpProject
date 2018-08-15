/* @flow */
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { createSwitchNavigator } from "react-navigation";

import Input from "./../../components/input";
import CustomButton from "./../../components/button";

import styles from "./styles";

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
    this.props.navigation.navigate("Home", {
      user: "Jesus Rey"
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("./../../images/logo.png")}
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
        <CustomButton title="Iniciar" onClick={this.handleButtonClick} />
      </View>
    );
  }
}
