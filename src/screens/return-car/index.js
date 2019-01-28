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
import { Mutation, Query, graphql } from "react-apollo";
import gql from "graphql-tag";

import styles from "./styles";
import { COLOR_ALERT, COLOR_SECONDARY, COLOR_BASE } from "./../../common";

import Input from "./../../components/input";
import CustomButton from "./../../components/button";

export class ReturnScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tokenLoaded: false,
      token: ""
    };
  }

  handleToken = token => {
    this.setState({ token: token });
  };

  handleButtonClick = () => {
    this.props.navigation.navigate("ServiceTab");
  };

  render() {
    if (this.state.tokenLoaded == false) {
      return (
        <View style={styles.container}>
          <View style={styles.block}>
            <Input
              placeholder={"Ingrese el token"}
              handleInput={this.handleToken}
              secure={false}
              capitalize={false}
            />
            <CustomButton
              title="Buscar Vehículo"
              onClick={() => {
                this.setState({ tokenLoaded: true });
              }}
              size="Normal"
            />
          </View>
        </View>
      );
    } else
      return (
        <View style={styles.container}>
          <ScrollView>
            <Query
              query={GET_PARKINGS_FOR_RETURN}
              variables={{
                token: this.state.token,
                serviceshiftId: this.props.navigation.state.params.shiftid
              }}
            >
              {({ loading, error, data }) => {
                console.log("DATA!: ", data);
                if (loading)
                  return (
                    <View style={styles.container}>
                      <ActivityIndicator size="large" color={COLOR_BASE} />
                    </View>
                  );
                else if (error)
                  return (
                    <View style={styles.container}>
                      <View style={styles.block}>
                        <Text style={styles.content}>Error!</Text>
                      </View>
                    </View>
                  );
                else if (!data.parkings[0])
                  return (
                    <View style={styles.container}>
                      <View style={styles.block}>
                        <Text>No se ha encontrado ningún vehículo.</Text>
                      </View>
                    </View>
                  );
                else {
                  const {
                    id,
                    plate,
                    owner,
                    values,
                    comment,
                    damage,
                    token,
                    sign
                  } = data.parkings[0];
                  return (
                    <View style={styles.block}>
                      <Text style={styles.content}>Token: {token}</Text>
                      <Text style={styles.content}>Placa: {plate}</Text>
                      <Text style={styles.content}>Propietario: {owner}</Text>
                      <Text style={styles.content}>
                        Objetos de valor:{" "}
                        {values ? values.map(value => value) : ""}
                      </Text>
                      <Text style={styles.content}>Comments: {comment}</Text>

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
                            source={{ uri: damage }}
                          />
                        </ImageBackground>
                      </View>

                      <View>
                        <ImageBackground
                          resizeMode={"contain"}
                          imageStyle={{
                            width: 300,
                            height: 200
                          }}
                          style={{
                            width: 300,
                            height: 200,
                            backgroundColor: "white"
                          }}
                        >
                          <Image
                            resizeMode={"contain"}
                            style={{ flex: 1 }}
                            source={{ uri: sign }}
                          />
                        </ImageBackground>
                      </View>

                      <Mutation mutation={RETURN_PARKING}>
                        {returnParking => {
                          return (
                            <CustomButton
                              title="Entregar Vehículo"
                              onClick={() => {
                                returnParking({
                                  variables: { id: id }
                                }).then(() => {
                                  this.props.navigation.navigate("ServiceTab");
                                });
                              }}
                              size="Normal"
                            />
                          );
                        }}
                      </Mutation>
                    </View>
                  );
                }
              }}
            </Query>
          </ScrollView>
        </View>
      );
  }
}

export const RETURN_PARKING = gql`
  mutation returnParking($id: ID!) {
    returnParking(id: $id) {
      returned
    }
  }
`;

export const GET_PARKINGS_FOR_RETURN = gql`
  query parkings($token: String!, $serviceshiftId: ID!) {
    parkings(token: $token, serviceshiftId: $serviceshiftId, returned: false) {
      id
      plate
      owner
      values
      comment
      damage
      sign
      token
      returned
    }
  }
`;

export default ReturnScreen;
