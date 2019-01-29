import React, { Component } from "react";
import {
  Modal,
  Text,
  View,
  TextInput,
  ScrollView,
  CheckBox,
  Image,
  ImageBackground,
  TouchableHighlight,
  ActivityIndicator,
  Alert,
  PermissionsAndroid
} from "react-native";
import { Mutation, graphql } from "react-apollo";
import gql from "graphql-tag";

import Orientation from "react-native-orientation";

import styles from "./styles";
import { COLOR_ALERT, COLOR_SECONDARY, COLOR_BASE } from "./../../common";

import Input from "./../../components/input";
import CustomButton from "./../../components/button";
import Signature from "./../../components/signature-canvas";

export class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plate: "",
      owner: "",
      values: [
        { type: "Joyas", selected: false },
        { type: "Portatil", selected: false },
        { type: "Dinero", selected: false }
      ],
      comments: "",
      signature: null,
      signUrl: "",
      damage: null,
      damageUrl: "",
      token: "",
      modalSign: false,
      modalReport: false,
      modalValues: false
    };
  }

  handlePlate = plate => {
    this.setState({ plate: plate });
  };

  handleOwner = owner => {
    this.setState({ owner: owner });
  };

  handleComments = comments => {
    this.setState({ comments: comments });
  };

  handleToken = token => {
    this.setState({ token: token });
  };

  handleButtonClick = () => {
    this.props.navigation.navigate("ServiceTab");
  };

  setModalSignVisible(visible) {
    this.setState({ modalSign: visible });
  }

  setModalReportVisible(visible) {
    this.setState({ modalReport: visible });
    if (visible) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
      Orientation.unlockAllOrientations();
    }
  }

  setModalValuesVisible(visible) {
    this.setState({ modalValues: visible });
  }

  handleSignature = signature => {
    this.setState({ signature });
    this.setModalSignVisible(false);
  };

  handleDamage = damage => {
    this.setState({ damage });
    this.setModalReportVisible(false);
  };

  ValueChange = index => {
    let newValues = [...this.state.values];
    newValues[index].selected = !newValues[index].selected;
    this.setState({ values: newValues });
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.block}>
            <Text style={styles.content}>Placa*</Text>
            <Input
              placeholder={"Nro de placa"}
              handleInput={this.handlePlate}
              secure={false}
              capitalize={true}
            />

            <Text style={styles.content}>Propietario</Text>
            <Input
              placeholder={"Nombre del cliente"}
              handleInput={this.handleOwner}
              secure={false}
              capitalize={false}
            />

            <TouchableHighlight
              // style={styles.block}
              onPress={() => this.setModalValuesVisible(true)}
            >
              <Text style={styles.content}>Objetos de valor</Text>
            </TouchableHighlight>

            <Modal
              animationType="slide"
              supportedOrientations={["landscape"]}
              transparent={true}
              visible={this.state.modalValues}
              onRequestClose={() => {
                this.setModalValuesVisible(false);
              }}
            >
              <View style={{ flex: 1 }}>
                <View style={styles.modal}>
                  {this.state.values.map((value, index) => {
                    return (
                      <View style={{ flexDirection: "row" }} key={value.type}>
                        <CheckBox
                          value={value.selected}
                          onValueChange={() => this.ValueChange(index)}
                        />
                        <Text style={{ marginTop: 5 }}>{value.type}</Text>
                      </View>
                    );
                  })}

                  <View style={styles.block}>
                    <TextInput
                      style={{
                        width: 180,
                        height: 80,
                        borderColor: "gray",
                        borderWidth: 0.5
                      }}
                      multiline={true}
                      numberOfLines={4}
                      editable={true}
                      maxLength={40}
                      placeholder={"Comentarios..."}
                      onChangeText={this.handleComments}
                      value={this.state.comments}
                    />
                  </View>
                </View>
              </View>
            </Modal>

            <TouchableHighlight
              style={styles.block}
              onPress={() => this.setModalReportVisible(true)}
            >
              <View>
                <ImageBackground
                  resizeMode={"contain"}
                  imageStyle={{ width: 300, height: 200 }}
                  style={{ width: 300, height: 200 }}
                  source={require("./../../images/car.jpg")}
                >
                  <Image
                    resizeMode={"contain"}
                    style={{ flex: 1 }}
                    source={{ uri: this.state.damage }}
                  />
                </ImageBackground>
              </View>
            </TouchableHighlight>

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

            <Text style={styles.content}>Token</Text>
            <Input
              placeholder={"Token*"}
              handleInput={this.handleToken}
              secure={false}
              capitalize={false}
            />

            <TouchableHighlight
              onPress={() => this.setModalSignVisible(true)}
              style={styles.block}
            >
              <View>
                <ImageBackground
                  resizeMode={"contain"}
                  imageStyle={{
                    width: 300,
                    height: 200
                  }}
                  style={{ width: 300, height: 200, backgroundColor: "white" }}
                >
                  <Image
                    resizeMode={"contain"}
                    style={{ flex: 1 }}
                    source={{ uri: this.state.signature }}
                  />
                </ImageBackground>
              </View>
            </TouchableHighlight>

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

            <Mutation mutation={NEW_PARKING}>
              {addParking => {
                let newValues = [];
                this.state.values.map(value => {
                  if (value.selected) newValues.push(value.type);
                });
                const parking = {
                  plate: this.state.plate,
                  owner: this.state.owner,
                  values: newValues,
                  comment: this.state.comments,
                  damage: this.state.damageUrl,
                  sign: this.state.signUrl,
                  token: this.state.token,
                  serviceshiftId: this.props.navigation.state.params.shiftid
                };
                return (
                  <CustomButton
                    title="Entregar Vehículo"
                    onClick={() => {
                      addParking({
                        variables: parking
                      }).then(() =>
                        this.props.navigation.navigate("ServiceTab")
                      );
                    }}
                    size="Normal"
                  />
                );
              }}
            </Mutation>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export const NEW_PARKING = gql`
  mutation addParking(
    $plate: String!
    $owner: String!
    $values: [String!]
    $comment: String!
    $damage: String!
    $sign: String!
    $token: String!
    $serviceshiftId: ID!
  ) {
    addParking(
      plate: $plate
      owner: $owner
      values: $values
      comment: $comment
      damage: $damage
      sign: $sign
      token: $token
      serviceshiftId: $serviceshiftId
    ) {
      id
    }
  }
`;

export default RegisterScreen;
