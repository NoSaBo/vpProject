/* @flow */

import React, { Component } from "react";
import {
  Modal,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  ImageBackground,
  ActivityIndicator,
  Alert,
  PermissionsAndroid
} from "react-native";
import { graphql } from "react-apollo";
import { gql } from "apollo-boost";
// import ImagePicker from "react-native-image-picker";

import styles from "./styles";
import { COLOR_ALERT, COLOR_SECONDARY, COLOR_BASE } from "./../../common";

import Input from "./../../components/input";
import CustomButton from "./../../components/button";
import Signature from "./../../components/signature-canvas";

// const photoOptions = {
//   quality: 1
// };

type Props = {};

type State = {};

export class RegisterScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      signature: null,
      damage: null,
      modalSign: false,
      modalReport: false
    };
  }

  // pickImageHandler = () => {
  //   ImagePicker.launchCamera(photoOptions, res => {
  //     if (res.didCancel) {
  //       console.log("User cancelled!");
  //     } else if (res.error) {
  //       console.log("Error", res.error);
  //     } else {
  //       this.setState({
  //         pickedImage: { uri: res.uri }
  //       });
  //     }
  //   });
  // };

  handleButtonClick = () => {
    this.props.navigation.navigate("Service");
  };

  setModalSignVisible(visible) {
    this.setState({ modalSign: visible });
  }

  setModalReportVisible(visible) {
    this.setState({ modalReport: visible });
  }

  handleSignature = signature => {
    this.setState({ signature });
    Alert.alert("La firma ha sido registrada.");
    this.setModalSignVisible(false);
  };

  handleDamage = damage => {
    this.setState({ damage });
    Alert.alert("Los daños han sido registrados.");
    this.setModalReportVisible(false);
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
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
            <View style={styles.block}>
              <ImageBackground
                resizeMode={"contain"}
                imageStyle={{ width: 300, height: 200 }}
                style={{ width: 300, height: 200 }}
                source={{
                  uri:
                    "https://st2.depositphotos.com/4162243/9047/v/950/depositphotos_90475184-stock-illustration-car-line-draw-insurance-rent.jpg"
                }}
              >
                <Image
                  resizeMode={"contain"}
                  style={{ flex: 1 }}
                  source={{ uri: this.state.damage }}
                />
              </ImageBackground>
            </View>
            <CustomButton
              title="Registrar daños"
              onClick={() => {
                this.setModalReportVisible(true);
              }}
              size="Small"
            />
            <Modal
              animationType="slide"
              supportedOrientations={["landscape"]}
              transparent={true}
              visible={this.state.modalReport}
              onRequestClose={() => {
                this.setModalReportVisible(false);
              }}
            >
              <Signature handle={this.handleDamage} signature={false} />
            </Modal>
            <View style={styles.block}>
              <ImageBackground
                resizeMode={"contain"}
                imageStyle={{
                  width: 300,
                  height: 200
                }}
                style={{ width: 300, height: 200, backgroundColor: "white" }}
                // source={{
                //   uri: ""
                // }}
              >
                <Image
                  resizeMode={"contain"}
                  style={{ flex: 1 }}
                  source={{ uri: this.state.signature }}
                />
              </ImageBackground>
            </View>
            <CustomButton
              title="Registrar Firma"
              onClick={() => {
                this.setModalSignVisible(true);
              }}
              size="Small"
            />
            <Modal
              animationType="slide"
              supportedOrientations={["landscape"]}
              transparent={true}
              visible={this.state.modalSign}
              onRequestClose={() => {
                this.setModalSignVisible(false);
              }}
            >
              <Signature handle={this.handleSignature} signature={true} />
            </Modal>
            <CustomButton
              title="Entregar Vehículo"
              onClick={() => {
                this.handleButtonClick;
              }}
              size="Normal"
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default RegisterScreen;