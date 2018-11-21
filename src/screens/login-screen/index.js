/* @flow */
import React from "react";
import { StyleSheet, Text, View, Image, Alert } from "react-native";
import { createSwitchNavigator } from "react-navigation";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import { ApolloConsumer } from "react-apollo";

import Input from "./../../components/input";
import CustomButton from "./../../components/button";
import styles from "./styles";

const LOG_USER = gql`
  query login($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
      id
      userName
      firstName
      lastName
    }
  }
`;

// const SET_USER = gql`
//   mutation setUser(
//     $userName: String!
//     $firstName: String!
//     $lastName: String!
//   ) {
//     setUser(userName: $userName, password: $password, lastName: $lastName) {
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

  // async handleButtonClick(client) {
  //   if (!this.state.user) {
  //     Alert.alert("Login Error", "Debe ingresar un nombre de usuario");
  //   } else {
  //     const { data } = await client.query({
  //       query: LOG_USER,
  //       variables: { userName: this.state.user, password: this.state.password }
  //     });
  //     console.log(data);
  //     client.writeData({});
  //     this.props.navigation.navigate("Home", {
  //       userName: this.state.user
  //     });
  //   }
  // }

  render() {
    return (
      <ApolloConsumer>
        {client => (
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
              onClick={async () => {
                if (!this.state.user) {
                  Alert.alert(
                    "Login Error",
                    "Debe ingresar un nombre de usuario"
                  );
                } else {
                  const { data } = await client.query({
                    query: LOG_USER,
                    variables: {
                      userName: this.state.user,
                      password: this.state.password
                    }
                  });
                  console.log("login!:", data.login);
                  const { userName, firstName, lastName } = data.login;
                  client.writeData({
                    data: {
                      userName: userName,
                      firstName: firstName,
                      lastName: lastName
                    }
                  });
                  this.props.navigation.navigate("Home", {
                    userName: data.login.userName
                  });
                }
              }}
              size="Normal"
            />
          </View>
        )}
      </ApolloConsumer>
    );
  }
}
