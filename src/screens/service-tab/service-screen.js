import React from "react";
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  Image,
  Alert
} from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

import Input from "./../../components/input";
import CustomButton from "./../../components/button";
import styles from "./styles";

export default class ServiceScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shiftid: ""
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("shiftid").then(value => {
      if (value) {
        this.setState({ shiftid: value });
      }
    });
  }

  handleRegister = () => {
    if (this.state.shiftid) {
      this.props.navigation.navigate("Register", {
        shiftid: this.state.shiftid
      });
    }
  };

  handleReturn = () => {
    if (this.state.shiftid) {
      this.props.navigation.navigate("Return", {
        shiftid: this.state.shiftid
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <CustomButton
          title="Registrar"
          onClick={this.handleRegister}
          size="Large"
        />
        <CustomButton
          title="Devolver"
          onClick={this.handleReturn}
          size="Large"
        />
      </View>
    );
  }
}
