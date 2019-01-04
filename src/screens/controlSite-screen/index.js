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

export class ControlSiteScreen extends React.Component {
  constructor(props) {
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
    if (this.state.inPosition) {
      const { branch } = this.props.data.serviceShift.branch;
      const { begindate, workspan } = this.props.data.serviceShift;
      this.props.navigation.navigate("EmployeeTab", {
        branch: branch,
        begindate: begindate,
        workspan: workspan
      });
      navigator.geolocation.clearWatch(this.watchId);
      console.log("cerrado!");
    } else Alert.alert("GPS Error", "No estas dentro del perimetro de la sede");
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

  async requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Aplicación VP",
          message: "Esta aplicación necesita acceder a su cámara"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
      } else {
        console.log("camera permission denied");
        alert("No podra acceder a sus turnos");
      }
    } catch (err) {
      console.warn("err:", err);
    }
  }

  async componentWillMount() {
    await this.requestGPSPermission();
    await this.requestCameraPermission();
  }

  componentDidMount() {
    // const { loading, error } = this.props.data;
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
      const { begindate, workspan } = this.props.data.serviceShift;
      const { branch } = this.props.data.serviceShift.branch;
      return (
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.block}>
              <View>
                <Text style={styles.title}>Sede:</Text>
              </View>
              <View>
                <Text style={styles.content}> {branch} </Text>
              </View>
              <View>
                <Text style={styles.title}>Turno:</Text>
              </View>
              <View>
                <Text style={styles.content}>
                  {" "}
                  {begindate} {" - "} {workspan}{" "}
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
              <View>
                <Text style={this.state.inPosition ? styles.green : styles.red}>
                  {this.state.alert}
                </Text>
              </View>
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
      begindate
      workspan
      branch {
        branch
        latitude
        longitude
      }
    }
  }
`;

export default graphql(SITE_QUERY, {
  options: props => ({
    variables: { id: props.navigation.state.params.id }
  })
})(ControlSiteScreen);
