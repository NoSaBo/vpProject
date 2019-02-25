import React, { Component } from "react";
import {
  Modal,
  View,
  ScrollView,
  Image,
  ImageBackground,
  TouchableHighlight,
  ActivityIndicator,
  Alert,
  PermissionsAndroid
} from "react-native";
import {
  Overlay,
  Card,
  CheckBox,
  Input,
  Button,
  Icon,
  Text
} from "react-native-elements";

import { Mutation, graphql } from "react-apollo";
import gql from "graphql-tag";

import Orientation from "react-native-orientation";

import styles from "./styles";
import { COLOR_ALERT, COLOR_SECONDARY, COLOR_BASE } from "./../../common";

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
    this.props.navigation.navigate("Service");
  };

  setModalSignVisible(visible) {
    this.setState({ modalSign: visible });
    if (visible) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
      Orientation.unlockAllOrientations();
    }
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
      <ScrollView>
        <Card>
          <Input
            placeholder={"Placa*"}
            leftIcon={{
              type: "font-awesome",
              name: "car",
              size: 15,
              color: "gray"
            }}
            onChangeText={this.handlePlate}
            autoCapitalize="characters"
          />
          <Input
            placeholder={"Propietario"}
            leftIcon={{
              type: "font-awesome",
              name: "user",
              size: 15,
              color: "gray"
            }}
            onChangeText={this.handleOwner}
          />
          <Input
            placeholder={"Token*"}
            leftIcon={{
              type: "font-awesome",
              name: "key",
              size: 15,
              color: "gray"
            }}
            onChangeText={this.handleToken}
            autoCapitalize="none"
          />
          <Button
            title="Añadir objetos de valor"
            icon={<Icon name="add-circle-outline" size={15} color="gray" />}
            buttonStyle={{ backgroundColor: "white" }}
            titleStyle={{ fontSize: 15, color: "gray" }}
            type="outline"
            raised
            onPress={() => this.setModalValuesVisible(true)}
          />

          <Overlay
            isVisible={this.state.modalValues}
            overlayBackgroundColor={"white"}
            onBackdropPress={() => {
              this.setModalValuesVisible(false);
            }}
          >
            <View style={{ paddingTop: 65 }}>
              <Icon
                name="close"
                raised={true}
                size={15}
                containerStyle={{
                  position: "absolute",
                  right: 0,
                  top: 0
                }}
                onPress={() => {
                  this.setModalValuesVisible(false);
                }}
              />
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
                serviceshiftId: this.props.navigation.state.params.shiftid,
                employeeId: this.props.navigation.state.params.userid
              };
              return (
                <Button
                  title="Parkear"
                  icon={<Icon name="check" size={15} color="white" />}
                  onPress={() => {
                    addParking({
                      variables: parking
                    }).then(() => this.props.navigation.navigate("Service"));
                  }}
                />
              );
            }}
          </Mutation>
        </Card>
      </ScrollView>
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
    $employeeId: ID!
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
      employeeId: $employeeId
    ) {
      id
    }
  }
`;

export default RegisterScreen;
