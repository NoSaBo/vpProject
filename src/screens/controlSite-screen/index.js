import React, { Component } from "react";
import {
  AsyncStorage,
  View,
  TextInput,
  ScrollView,
  Image,
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
import { Mutation, graphql } from "react-apollo";
import gql from "graphql-tag";
import moment from "moment";
import "moment/locale/es";

import styles from "./styles";
import {
  COLOR_ALERT,
  COLOR_SECONDARY,
  COLOR_BASE,
  COLOR_PRIMARY
} from "./../../common";

import controlCamera, { ControlCamera } from "./control-camera";
import ControlPosition from "./control-position";

export class ControlSiteScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      user: "",
      userid: "",
      latitude: null,
      longitude: null,
      inPosition: false,
      photo: "",
      comments: ""
    };
  }

  async requestPermissions() {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
      ]);
      console.log("GRANTED?: ", granted);
      if (Object.keys(granted).every(key => granted[key] == "granted")) {
        console.log("loading: ", this.state.loading);
        this.setState({ loading: false });
        console.log("loading: ", this.state.loading);
      }
    } catch (err) {
      console.warn("err:", err);
    }
  }

  // Get Permissions and the ID of user from Android internal database
  componentDidMount() {
    this.requestPermissions();
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
      attendance({ variables: variables }).then(data => {
        AsyncStorage.multiSet([
          ["shiftid", id],
          ["branch", branch],
          ["begindate", begindate],
          ["workspan", workspan]
        ]);
        this.props.navigation.navigate("Service", {
          branch: branch,
          begindate: begindate,
          workspan: workspan
        });
      });
    } else if (!this.state.photo) {
      Alert.alert("Foto Error", "Debes tomar una foto");
    } else Alert.alert("GPS Error", "No estas dentro del perimetro de la sede");
  }

  render() {
    const { loading, error } = this.props.data;
    if (loading || this.state.loading)
      return <ActivityIndicator size="large" color={COLOR_BASE} />;
    else {
      const { begindate, workspan, branch } = this.props.data.serviceShifts[0];
      return (
        <View style={styles.container}>
          <ScrollView>
            <Card>
              {/* <Icon
                type="font-awesome"
                containerStyle={{
                  position: "absolute",
                  right: 0,
                  top: 0
                }}
                name="comment"
                size={20}
                color={COLOR_PRIMARY}
                // reverse={true}
                reverseColor={COLOR_BASE}
                raised={true}
              /> */}
              <Text h4>{branch.branch}</Text>
              <Text h4>
                {moment(begindate).format("h:mm a") +
                  " - " +
                  moment(workspan).format("h:mm a")}
              </Text>
            </Card>
            <ControlCamera setPhoto={photo => this.setPhoto(photo)} />
            <Card>
              <ControlPosition
                setCoords={(lat, long) => this.setCoords(lat, long)}
                latitude={branch.latitude}
                longitude={branch.longitude}
              />
              <Mutation mutation={ATTENDANCE}>
                {attendance => {
                  return (
                    <Button
                      title="Iniciar Turno"
                      onPress={() => {
                        this.handleButtonClick(attendance);
                      }}
                    />
                  );
                }}
              </Mutation>
            </Card>
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
