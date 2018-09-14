/* @flow */
import React from "react";
import { Text, View, Image } from "react-native";
import styles from "./styles";
import CustomButton from "../../components/button";

var ImagePicker = require('react-native-image-picker');


export default class ControlPhotoScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      employeeName: "Richard Gomez",
      pickedImage: null,
    };
  }

  static navigationOptions = {
    title: "Autenticación de imagen"
  };

  photoOptions = {
    quality: 0.5
  };

  pickImageHandler = () => {
    ImagePicker.launchCamera(this.photoOptions, res => {
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
          onClick={this.pickImageHandler}
        />
        <View>
          <Text style={styles.title}>Iniciar el servicio como:</Text>
        </View>
        <View>
          <Text style={styles.content}> {this.state.employeeName} </Text>
        </View>
        <View>
          <CustomButton title="Iniciar" />
        </View>
      </View>
    );
  }
}
