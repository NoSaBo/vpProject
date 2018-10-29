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
import geolib from "geolib";

import styles from "./styles";
import { COLOR_ALERT, COLOR_SECONDARY, COLOR_BASE } from "./../../common";

import Input from "./../../components/input";
import CustomButton from "./../../components/button";

const photoOptions = {
  quality: 1
};

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
    // if (this.state.inPosition) {
    const { branchName } = this.props.data.serviceShift.branch;
    const { begin, end } = this.props.data.serviceShift;
    this.props.navigation.navigate("EmployeeTab", {
      branch: branchName,
      begin: begin,
      end: end
    });
    // } else Alert.alert("GPS Error", "No estas dentro del perimetro de la sede");
  };

  // Permissions
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
      console.warn("err:", err);
    }
  }

  async componentWillMount() {
    await this.requestGPSPermission();
  }

  componentDidMount() {
    const { loading, error } = this.props.data;
    if (!loading) {
      console.log("INICIATE LOCATION");
      this.watchId = navigator.geolocation.watchPosition(
        position => {
          console.log("POSITION COORDS", position.coords);
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
          console.log("DISTANCE", distance);
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
      console.log("DATA LOADED:", this.props.data);
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
            <View style={styles.block}>
              <Image
                style={styles.image}
                source={
                  this.state.pickedImage
                    ? this.state.pickedImage
                    : require("./../../images/manPhoto.png")
                }
                resizeMode="contain"
              />
              <CustomButton
                title="Capturar foto"
                onClick={this.pickImageHandler}
                size="Normal"
              />
            </View>
            <View style={styles.access}>
              <CustomButton
                title="Iniciar Turno"
                onClick={this.handleButtonClick}
                size="Normal"
              />
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}

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
    userName @client
    firstName @client
    lastName @client
  }
`;

export default graphql(SITE_QUERY, {
  options: props => ({
    variables: { id: props.navigation.state.params.id }
  })
})(ControlSiteScreen);
