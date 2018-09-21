/* @flow */

import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert,
  PermissionsAndroid
} from "react-native";
import { graphql } from "react-apollo";
import { gql } from "apollo-boost";
import geolib from "geolib";

import styles from "./styles";
import { COLOR_ALERT, COLOR_SECONDARY, COLOR_BASE } from "./../../common";

import Input from "./../../components/input";
import CustomButton from "./../../components/button";

const SITE_QUERY = gql`
  query serviceShift($id: Int!) {
    serviceShift(id: $id) {
      begin
      end
      branch {
        branchName
        latitude
        longitude
      }
    }
  }
`;

type Props = {};

type State = {
  user: string
};

export class ControlSiteScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      user: "",
      latitude: null,
      longitude: null,
      inPosition: false,
      alert: "Obteniendo posición GPS",
      error: null
    };
  }

  static navigationOptions = {
    title: "Inicio de Turno"
  };

  handleButtonClick = () => {
    // if (this.state.inPosition)
    this.props.navigation.navigate("Photo");
    // else Alert.alert("GPS Error", "No estas dentro del perimetro de la sede");
  };

  handleUser = (text: string) => {
    this.setState({ user: text });
  };

  async requestGPSPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Aplicación VP",
          message: "Esta aplicación necesita acceder a su posición"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location");
      } else {
        console.log("location permission denied");
        alert("No podra acceder a sus turnos");
      }
    } catch (err) {
      console.warn(err);
    }
  }

  async componentWillMount() {
    await this.requestGPSPermission();
  }

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      position => {
        console.log(position.coords);
        this.setState({
          error: null,
          alert: "Obteniendo posición"
        });
        const { latitude, longitude } = this.props.data.serviceShift.branch;
        const distance = geolib.getDistance(
          position.coords,
          {
            latitude: latitude,
            longitude: longitude
          },
          1,
          1
        );
        console.log(distance);
        if (distance < 50) {
          this.setState({
            inPosition: true,
            alert: "Estas en el perimetro de la sede",
            error: null
          });
        } else {
          this.setState({
            inPosition: false,
            alert: "No estas en el perimetro de la sede"
          });
        }
      },
      error => this.setState({ error: error.message }),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10
      }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
    console.log("cerrado!");
  }

  render() {
    const { loading, error } = this.props.data;
    if (loading)
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={COLOR_BASE} />
        </View>
      );
    else {
      const { begin, end } = this.props.data.serviceShift;
      const { branchName } = this.props.data.serviceShift.branch;
      return (
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.block}>
              <View>
                <Text style={styles.title}>Sede:</Text>
              </View>
              <View>
                <Text style={styles.content}> {branchName} </Text>
              </View>
              <View>
                <Text style={styles.title}>Turno:</Text>
              </View>
              <View>
                <Text style={styles.content}>
                  {" "}
                  {begin} {" - "} {end}{" "}
                </Text>
              </View>

              <View>
                <Text style={this.state.inPosition ? styles.green : styles.red}>
                  {this.state.alert}
                </Text>
              </View>
            </View>
            <View style={styles.access}>
              <Input
                placeholder={"Usuario"}
                handleInput={this.handleUser}
                secure={false}
              />
              <CustomButton
                title="Acceder"
                onClick={this.handleButtonClick}
                small={false}
              />
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}

export default graphql(SITE_QUERY, {
  options: props => ({
    variables: { id: props.navigation.state.params.id }
  })
})(ControlSiteScreen);
