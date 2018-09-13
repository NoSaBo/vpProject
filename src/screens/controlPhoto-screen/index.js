/* @flow */

import React from "react";
import { Text, View, Image } from "react-native";
import styles from "./styles";
import CustomButton from "./../../components/button";
import ImagePicker from "react-native-image-picker";

const photoOptions = {
  quality: 1
};

export default class ControlPhotoScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      empleado: "Richard Gomez"
    }
  }

  static navigationOptions = {
    title: "Autenticación de imagen"
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
          <Text style={styles.content}> {this.state.empleado} </Text>
        </View>
        <View>
          <CustomButton title="Iniciar" />
        </View>
      </View>
    );
  }
}