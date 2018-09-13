/* @flow */
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { createSwitchNavigator } from "react-navigation";
import gql from "graphql-tag";
import { withApollo } from "react-apollo";

import Input from "./../../components/input";
import CustomButton from "./../../components/button";

import styles from "./styles";

const FEED_QUERY = gql`
  {
    login(userName: "jreyp", password: "jesus") {
      id
      firstName
      lastName
    }
  }
`;

type Props = {};

type State = {
  user: string,
  password: string
};

export class LoginScreen extends React.Component<Props, State> {
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
    console.log(this.props);
    // this.props.client
    //   .query({
    //     query: gql`
    //       {
    //         login(userName: "jreyp", password: "jesus") {
    //           id
    //           firstName
    //           lastName
    //         }
    //       }
    //     `
    //   })
    //   .then(result => {
    //     console.log(result);
    //     // if (result.data) {
    //     //   this.props.navigation.navigate("Home", {
    //     //     user: "Jesus Rey"
    //     //   });
    //     // }
    //   });
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
        <CustomButton title="Iniciar" onClick={this.handleButtonClick} />
      </View>
    );
  }
}

export default withApollo(LoginScreen);
