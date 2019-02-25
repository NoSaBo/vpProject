import React, { Component } from "react";
import {
  Modal,
  View,
  TextInput,
  ScrollView,
  CheckBox,
  Image,
  ImageBackground,
  TouchableHighlight,
  ActivityIndicator,
  Alert,
  PermissionsAndroid
} from "react-native";
import {
  Card,
  Button,
  Input,
  Icon,
  Text,
  ListItem
} from "react-native-elements";
import { Mutation, Query, graphql } from "react-apollo";
import gql from "graphql-tag";

import styles from "./styles";
import { COLOR_ALERT, COLOR_SECONDARY, COLOR_BASE } from "./../../common";

export class ReturnScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      id,
      plate,
      owner,
      values,
      comment,
      damage,
      token,
      sign,
      employee
    } = this.props.navigation.state.params.parking;
    return (
      <ScrollView>
        <Card
          wrapperStyle={{
            justifyContent: "space-around",
            alignItems: "stretch"
          }}
        >
          <ListItem title="Token:" rightTitle={token} />
          <ListItem title="Placa:" rightTitle={plate} />
          <ListItem title="Propietario:" rightTitle={owner} />
          <ListItem
            title="Objetos de valor:"
            rightTitle={values ? values.map(value => value).join(" ") : ""}
          />
          <ListItem title="Comments:" rightTitle={comment} />
          <ListItem title="Parkeador:" rightTitle={employee.user} />

          <View style={styles.block}>
            <ImageBackground
              resizeMode={"contain"}
              imageStyle={{ width: 300, height: 200 }}
              style={{ width: 300, height: 200 }}
              source={require("./../../images/car.jpg")}
            >
              <Image
                resizeMode={"contain"}
                style={{ flex: 1 }}
                source={{ uri: damage }}
              />
            </ImageBackground>
          </View>

          <View style={styles.block}>
            <ImageBackground
              resizeMode={"contain"}
              imageStyle={{
                width: 300,
                height: 200
              }}
              style={{
                width: 300,
                height: 200,
                backgroundColor: "white"
              }}
            >
              <Image
                resizeMode={"contain"}
                style={{ flex: 1 }}
                source={{ uri: sign }}
              />
            </ImageBackground>
          </View>

          <Mutation mutation={RETURN_PARKING}>
            {returnParking => {
              return (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Button
                    title="Devolver Vehículo"
                    onPress={() => {
                      returnParking({
                        variables: { id: id }
                      }).then(() => {
                        this.props.navigation.navigate("Service");
                      });
                    }}
                  />
                </View>
              );
            }}
          </Mutation>
        </Card>
      </ScrollView>
    );
  }
}

export const RETURN_PARKING = gql`
  mutation returnParking($id: ID!) {
    returnParking(id: $id) {
      returned
    }
  }
`;

export default ReturnScreen;
