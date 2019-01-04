import React from "react";
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  Image,
  Alert
} from "react-native";
import { createSwitchNavigator } from "react-navigation";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import { ApolloConsumer } from "react-apollo";

import Input from "./../../components/input";
import CustomButton from "./../../components/button";
import styles from "./styles";

const LOG_USER = gql`
  query login($user: String!, $password: String!) {
    login(user: $user, password: $password) {
      id
      user
      firstname
      lastname
    }
  }
`;

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      password: ""
    };
  }

  handleUser = (text: String) => {
    this.setState({ user: text });
  };

  handlePassword = (text: String) => {
    this.setState({ password: text });
  };

  componentWillMount() {
    AsyncStorage.getItem("user").then(value => {
      if (value) {
        this.props.navigation.navigate("Home", {
          user: value
        });
      }
    });
  }

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <View style={styles.container}>
            <Image
              style={styles.image}
              source={require("./../../images/parkeo.png")}
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
                    "Error de inicio de sesión",
                    "Debe ingresar un nombre de usuario"
                  );
                } else {
                  const { data } = await client.query({
                    query: LOG_USER,
                    variables: {
                      user: this.state.user,
                      password: this.state.password
                    }
                  });
                  const { user, firstname, lastname } = data.login;
                  AsyncStorage.setItem("user", user);
                  client.writeData({
                    data: {
                      user: user,
                      firstname: firstname,
                      lastname: lastname
                    }
                  });
                  this.props.navigation.navigate("Home", {
                    user: data.login.user
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
