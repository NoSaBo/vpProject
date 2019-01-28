import React, { Component } from "react";
import {
  AsyncStorage,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
  PermissionsAndroid
} from "react-native";
import { Mutation, graphql } from "react-apollo";
import gql from "graphql-tag";
import moment from "moment";
import "moment/locale/es";

import styles from "./styles";
import { COLOR_ALERT, COLOR_SECONDARY, COLOR_BASE } from "./../../common";

import Input from "./../../components/input";
import CustomButton from "./../../components/button";
import controlCamera, { ControlCamera } from "./control-camera";
import ControlPosition from "./control-position";

export class ControlSiteScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      userid: "",
      latitude: null,
      longitude: null,
      inPosition: false,
      photo: "",
      comments: ""
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("userid").then(value => {
      this.setState({
        userid: value
      });
    });
  }

  setPhoto(photo) {
    this.setState({
      photo: photo
    });
  }

  setCoords(latitude, longitude) {
    this.setState({
      latitude: latitude,
      longitude: longitude,
      inPosition: true
    });
  }

  handleButtonClick(attendance) {
    if (
      this.state.photo &&
      (this.state.inPosition || this.state.comments != "")
    ) {
      const { branch } = this.props.data.serviceShifts[0].branch;
      const { begindate, workspan } = this.props.data.serviceShifts[0];
      const id = this.props.navigation.state.params.id;
      const variables = {
        photo: this.state.photo,
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        comment: this.state.comments,
        employeeId: this.state.userid,
        serviceShiftId: id
      };
      console.log("VARIABLES!: ", variables);
      attendance({ variables: variables }).then(
        data => {
          console.log("DATAAAAAA: ", data);
        },
        error => console.log("PTMR: ", error)
      );
      AsyncStorage.multiSet([
        ["shiftid", id],
        ["branch", branch],
        ["begindate", begindate],
        ["workspan", workspan]
      ]);
      // this.props.navigation.navigate("EmployeeTab", {
      //   branch: branch,
      //   begindate: begindate,
      //   workspan: workspan
      // });
    } else if (!this.state.photo) {
      Alert.alert("Foto Error", "Debes tomar una foto");
    } else Alert.alert("GPS Error", "No estas dentro del perimetro de la sede");
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
      const { begindate, workspan, branch } = this.props.data.serviceShifts[0];
      return (
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.block}>
              <View>
                <Text style={styles.title}>Sede:</Text>
              </View>
              <View>
                <Text style={styles.content}> {branch.branch} </Text>
              </View>
              <View>
                <Text style={styles.title}>Turno:</Text>
              </View>
              <View>
                <Text style={styles.content}>
                  {moment(begindate).format("HH:mm")} -{" "}
                  {moment(workspan).format("HH:mm")}
                </Text>
              </View>
            </View>
            <ControlCamera setPhoto={photo => this.setPhoto(photo)} />
            <View style={styles.access}>
              <ControlPosition
                setCoords={(lat, long) => this.setCoords(lat, long)}
                latitude={branch.latitude}
                longitude={branch.longitude}
              />
              <Mutation mutation={ATTENDANCE}>
                {attendance => {
                  return (
                    <CustomButton
                      title="Iniciar Turno"
                      onClick={() => {
                        this.handleButtonClick(attendance);
                      }}
                      size="Normal"
                    />
                  );
                }}
              </Mutation>
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}

const SITE_QUERY = gql`
  query serviceShifts($id: ID!) {
    serviceShifts(id: $id) {
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

export const ATTENDANCE = gql`
  mutation updateEmployeesxServiceShifts(
    $photo: String!
    $latitude: Float!
    $longitude: Float!
    $comment: String!
    $employeeId: ID!
    $serviceShiftId: ID!
  ) {
    updateEmployeesxServiceShifts(
      photo: $photo
      latitude: $latitude
      longitude: $longitude
      comment: $comment
      employeeId: $employeeId
      serviceShiftId: $serviceShiftId
    ) {
      id
    }
  }
`;

export default graphql(SITE_QUERY, {
  options: props => ({
    variables: { id: props.navigation.state.params.id }
  })
})(ControlSiteScreen);
