import React from "react";
import {
  AsyncStorage,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  Alert
} from "react-native";
import { Button, Input, Icon } from "react-native-elements";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import styles from "./styles";
import { COLOR_ALERT, COLOR_SECONDARY, COLOR_BASE } from "./../../common";

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      password: ""
    };
  }

  handleUser = text => {
    this.setState({ user: text });
  };

  handlePassword = text => {
    this.setState({ password: text });
  };

  handleInput = (login, error) => {
    if (!this.state.user) {
      Alert.alert(
        "Error de inicio de sesión",
        "Debe ingresar un nombre de usuario"
      );
      return;
    } else
      login({
        variables: {
          user: this.state.user,
          password: this.state.password
        }
      }).then(value => {
        const { data } = value;
        if (error) console.log("mutation error: ", error);
        if (!data.login)
          Alert.alert(
            "Error de inicio de sesión",
            "El usuario y/o contraseña es inválido"
          );
        else {
          const { id, user, firstname, lastname } = data.login;
          const name = firstname + " " + lastname;
          AsyncStorage.multiSet([
            ["userid", id],
            ["user", user],
            ["name", name]
          ]);
          this.props.navigation.navigate("Home", {
            user: data.login.user,
            name: name
          });
        }
      });
  };

  componentWillMount() {
    AsyncStorage.multiGet(["user", "name"]).then(value => {
      if (value[0][1]) {
        this.props.navigation.navigate("Home", {
          user: value[0][1],
          name: value[1][1]
        });
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("./../../images/parkeo.png")}
        />
        <Input
          placeholder={"Usuario"}
          leftIcon={{
            type: "font-awesome",
            name: "user",
            color: "gray"
          }}
          onChangeText={this.handleUser}
          autoCapitalize="none"
        />
        <Input
          placeholder={"Contraseña"}
          leftIcon={{ type: "font-awesome", name: "lock", color: "gray" }}
          onChangeText={this.handlePassword}
          secureTextEntry
          autoCapitalize="none"
        />
        <Mutation mutation={LOG_USER}>
          {(login, { loading, error }) => {
            return (
              <Button
                title="Entrar"
                loading={loading}
                icon={
                  <Icon
                    type="font-awesome"
                    name="sign-in"
                    size={15}
                    color="white"
                  />
                }
                onPress={() => this.handleInput(login, error)}
              />
            );
          }}
        </Mutation>
      </View>
    );
  }
}

const LOG_USER = gql`
  mutation login($user: String!, $password: String!) {
    login(user: $user, password: $password) {
      id
      user
      firstname
      lastname
    }
  }
`;
