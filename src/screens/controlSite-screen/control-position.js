import React, { Component } from "react";
import { Text, View, Alert, PermissionsAndroid } from "react-native";
import geolib from "geolib";

import styles from "./styles";
import { COLOR_ALERT, COLOR_SECONDARY, COLOR_BASE } from "../../common";

import CustomButton from "../../components/button";

export class ControlPosition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inPosition: false,
      alert: "Obteniendo posición GPS",
      error: null
    };
  }

  // Permissions
  // async requestGPSPermission() {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       {
  //         title: "Aplicación VP",
  //         message: "Esta aplicación necesita acceder a su posición"
  //       }
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log("You can use the location");
  //     } else {
  //       console.log("location permission denied");
  //       alert("No podra acceder a sus turnos");
  //     }
  //   } catch (err) {
  //     console.warn("err:", err);
  //   }
  // }

  // async componentWillMount() {
  //   await this.requestGPSPermission();
  // }

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      position => {
        this.setState({
          error: null,
          alert: "Obteniendo posición"
        });
        const distance = geolib.getDistance(
          position.coords,
          {
            latitude: this.props.latitude,
            longitude: this.props.longitude
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
          this.props.setCoords(
            position.coords.latitude,
            position.coords.longitude
          );
          navigator.geolocation.clearWatch(this.watchId);
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
    console.log("cerrado-unmount!");
  }

  render() {
    return (
      <Text style={this.state.inPosition ? styles.green : styles.red}>
        {this.state.alert}
      </Text>
    );
  }
}

export default ControlPosition;
