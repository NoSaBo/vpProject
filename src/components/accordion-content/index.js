import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Card, Button, Input, Icon, Text } from "react-native-elements";

import CustomButton from "./../../components/button";
import moment from "moment";
import "moment/locale/es";

import styles from "./styles";
// navigation
import { withNavigation } from "react-navigation";

class accordionContent extends React.Component {
  handleService = () => {
    this.props.navigation.navigate("Site", {
      id: this.props.id
    });
  };

  render() {
    const { address, begindate, workspan, active } = this.props;
    const button = active ? (
      <Button
        title="Iniciar turno"
        icon={
          <Icon type="font-awesome" name="sign-in" size={15} color="white" />
        }
        onPress={this.handleService}
      />
    ) : null;
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text>{address}</Text>
        <Text style={{ fontSize: 18 }}>
          {moment(begindate).format("h:mm a") +
            " - " +
            moment(workspan).format("h:mm a")}
        </Text>
        {button}
      </View>
    );
  }
}

export default withNavigation(accordionContent);
