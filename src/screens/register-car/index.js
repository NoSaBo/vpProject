import React, { Component } from "react";
import {
  Modal,
  Text,
  View,
  ScrollView,
  Image,
  ImageBackground,
  TouchableHighlight,
  ActivityIndicator,
  Alert,
  PermissionsAndroid
} from "react-native";
import { Overlay, CheckBox, Input, Button, Icon } from "react-native-elements";

import { Mutation, graphql } from "react-apollo";
import gql from "graphql-tag";

import Orientation from "react-native-orientation";

import styles from "./styles";
import { COLOR_ALERT, COLOR_SECONDARY, COLOR_BASE } from "./../../common";

// import Input from "./../../components/input";
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
            <Input
              placeholder={"Placa*"}
              leftIcon={{ type: "font-awesome", name: "car" }}
              onChangeText={this.handlePlate}
              autoCapitalize="characters"
            />
            <Input
              placeholder={"Propietario"}
              leftIcon={{ type: "font-awesome", name: "user" }}
              onChangeText={this.handleOwner}
            />
            <Input
              placeholder={"Token*"}
              leftIcon={{ type: "font-awesome", name: "key" }}
              onChangeText={this.handleToken}
              autoCapitalize="none"
            />
            <Button
              title="Objetos de valor"
              icon={<Icon name="add-circle-outline" size={15} />}
              type="clear"
              onPress={() => this.setModalValuesVisible(true)}
            />

            <Overlay
              isVisible={this.state.modalValues}
              onBackdropPress={() => {
                this.setModalValuesVisible(false);
              }}
            >
              <View>
                {this.state.values.map((value, index) => {
                  return (
                    <CheckBox
                      key={value.type}
                      center
                      title={value.type}
                      checked={value.selected}
                      onPress={() => this.ValueChange(index)}
                    />
                  );
                })}
                <Input
                  multiline={true}
                  editable={true}
                  maxLength={60}
                  placeholder="Comentarios..."
                  onChangeText={this.handleComments}
                  value={this.state.comments}
                  shake={true}
                />
              </View>
            </Overlay>

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

            <TouchableHighlight
              style={styles.block}
              onPress={() => this.setModalSignVisible(true)}
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
                  <Button
                    title="Entregar Vehículo"
                    icon={<Icon name="check" size={15} />}
                    onPress={() => {
                      addParking({
                        variables: parking
                      }).then(() =>
                        this.props.navigation.navigate("ServiceTab")
                      );
                    }}
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
