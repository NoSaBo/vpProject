/* @flow */

import React from "react";
import { Text, View, Image, ScrollView, ActivityIndicator } from "react-native";
import styles from "./styles";
import CustomButton from "../../components/button";
import ImagePicker from "react-native-image-picker";
import { graphql } from "react-apollo";
import { gql } from "apollo-boost";

import { COLOR_ALERT, COLOR_SECONDARY, COLOR_BASE } from "./../../common";

const photoOptions = {
  quality: 1
};

export class ControlPhotoScreen extends React.Component {
  constructor() {
    super();
    this.state = {};
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

  handleButton = () => {
    const { branch, begin, end } = this.props.navigation.state.params;
    this.props.navigation.navigate("EmployeeTab", {
      branch: branch,
      begin: begin,
      end: end
    });
  };

  render() {
    const { loading, error } = this.props.data;
    if (loading)
      return (
        <View style={styles.container}>
          <ActivityIndicator size="small" color={COLOR_BASE} />
        </View>
      );
    else {
      console.log(this.props.data);
      const { firstName, lastName } = this.props.data;
      return (
        <View style={styles.container}>
          <ScrollView>
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
                <Text style={styles.title}>Iniciar el servicio como:</Text>
              </View>
              <View>
                <Text style={styles.content}>
                  {" "}
                  {firstName} {lastName}
                </Text>
              </View>
              <View>
                <CustomButton
                  title="Iniciar"
                  onClick={this.handleButton}
                  size="Normal"
                />
              </View>
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}

const USER_QUERY = gql`
  {
    userName @client
    firstName @client
    lastName @client
  }
`;

export default graphql(USER_QUERY, {
  // options: props => ({
  //   variables: { id: props.navigation.state.params.id }
  // })
})(ControlPhotoScreen);
