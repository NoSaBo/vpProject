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
import ImagePicker from "react-native-image-picker";

import styles from "./styles";
import { COLOR_ALERT, COLOR_SECONDARY, COLOR_BASE } from "../../common";

import CustomButton from "../../components/button";

const photoOptions = {
  quality: 1
};

export class ControlCamera extends React.Component {
  constructor(props) {
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
        this.props.setPhoto(res.uri);
      }
    });
  };

  // Permissions
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
    await this.requestCameraPermission();
  }

  render() {
    return (
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
    );
  }
}

export default ControlCamera;
