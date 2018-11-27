/* @flow */

import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
  PermissionsAndroid
} from "react-native";
import { graphql } from "react-apollo";
import { gql } from "apollo-boost";
import ImagePicker from "react-native-image-picker";

import styles from "./styles";
import { COLOR_ALERT, COLOR_SECONDARY, COLOR_BASE } from "./../../common";

import Input from "./../../components/input";
import CustomButton from "./../../components/button";

const photoOptions = {
  quality: 1
};

type Props = {};

type State = {};

export class RegisterScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  pickImageHandler = () => {
    ImagePicker.launchCamera(photoOptions, res => {
      if (res.didCancel) {
        console.log("User cancelled!");
      } else if (res.error) {
        console.log("Error", res.error);
      } else {
        this.setState({
          pickedImage: { uri: res.uri }
        });
      }
    });
  };

  handleButtonClick = () => {
    this.props.navigation.navigate("ServiceTab");
  };

  _signaturePadError = error => {
    console.error(error);
    console.log("SignatureError", error);
  };

  _signaturePadChange = ({ base64DataUrl }) => {
    console.log("Got new signature: " + base64DataUrl);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.block}>
          <Text style={styles.content}>Placa*</Text>
          <Input
            placeholder={"Nro de placa"}
            handleInput={this.handleUser}
            secure={false}
          />

          <Text style={styles.content}>Propietario</Text>
          <Input
            placeholder={"Nombre del cliente"}
            handleInput={this.handlePassword}
            secure={false}
          />
          <CustomButton
            title="Registrar"
            onClick={this.handleButtonClick}
            size="Normal"
          />
        </View>
      </View>
    );
  }
}

export default RegisterScreen;
