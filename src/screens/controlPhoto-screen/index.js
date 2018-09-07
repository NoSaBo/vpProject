/* @flow */

import React from "react";
import { Text, View, Image } from "react-native";
import styles from "./styles";
import CustomButton from "./../../components/button";

// capture image
import ImagePicker from "react-native-image-picker";

type Props = {};

const photoOptions = {
  quality: 1
};

export default class ControlPhotoScreen extends React.Component {
  static navigationOptions = {
    title: "Control de foto"
  };

  state = {
    pickedImage: null
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

  render() {
    return (
      <View style={styles.container}>
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
          title="Capturar Foto"
          onClick={this.pickImageHandler.bind(this)}
        />
        <View>
          <Text style={styles.title}>Iniciar el servicio como:</Text>
        </View>
        <View>
          <Text style={styles.content}>[ Empleado ]</Text>
        </View>
        <View>
          <CustomButton title="Iniciar" />
        </View>
      </View>
    );
  }
}
