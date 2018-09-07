import React from "react";
import { Text, View, Image } from "react-native";
import styles from "./styles";
import CustomButton from "./../../components/button";

export default class ControlPhotoScreen extends React.Component {
  static navigationOptions = {
    title: "Control de foto"
  };

  render() {
    return (
      <View style={styles.container}>
          <Image
            style={styles.image}
            source={require("./../../images/manPhoto.png")}
          />
          <CustomButton title="Tomar otra Foto" />
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
