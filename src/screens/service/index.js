import React from "react";
import {
  AsyncStorage,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  View,
  Image,
  Alert
} from "react-native";
import {
  Card,
  Button,
  Input,
  Icon,
  Text,
  ListItem
} from "react-native-elements";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import styles from "./styles";
import moment from "moment";
import "moment/locale/es";

import {
  COLOR_ALERT,
  COLOR_SECONDARY,
  COLOR_BASE,
  COLOR_PRIMARY
} from "./../../common";

export class ServiceScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shiftid: "",
      userid: ""
    };
  }

  async removeItemValues(keys) {
    try {
      await AsyncStorage.multiRemove(keys);
      return true;
    } catch (exception) {
      return false;
    }
  }

  componentDidMount() {
    AsyncStorage.getItem("shiftid").then(value => {
      if (value) {
        this.setState({ shiftid: value });
      }
    });
    AsyncStorage.getItem("userid").then(value => {
      if (value) {
        this.setState({ userid: value });
      }
    });
  }

  handleRegister = () => {
    if (this.state.shiftid) {
      this.props.navigation.navigate("Register", {
        shiftid: this.state.shiftid,
        userid: this.state.userid
      });
    }
  };

  handleLogout = () => {
    if (this.removeItemValues(["shiftid", "branch", "begindate", "workspan"]))
      this.props.navigation.navigate("Home", {});
  };

  render() {
    const { branch, begindate, workspan } = this.props.navigation.state.params;
    return (
      <ScrollView>
        <Card>
          <Text h4>{branch}</Text>
          <Text>{moment(begindate).format("DD [de] MMMM")}</Text>
          <Text>
            {moment(begindate).format("h:mm a") +
              " - " +
              moment(workspan).format("h:mm a")}
          </Text>
          <Button title="Finalizar Turno" onPress={this.handleLogout} />
        </Card>
        <Card
          wrapperStyle={{
            justifyContent: "space-around",
            alignItems: "stretch"
          }}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Button title="Registrar Auto" onPress={this.handleRegister} />
          </View>
          <Text h4 style={{ textAlign: "center", marginTop: 10 }}>
            Autos Parkeados
          </Text>
          <Query
            query={PARKING_QUERY}
            variables={{ serviceshiftId: this.state.shiftid }}
            pollInterval={10000}
            options={{ fetchPolicy: "cache-and-network" }}
          >
            {({ loading, error, data, refetch, networkStatus }) => {
              if (loading || networkStatus === 4)
                return <ActivityIndicator size="large" color={COLOR_PRIMARY} />;
              if (error) return <Text> Error: {error.Error} </Text>;

              const { parkings } = data;
              return parkings
                .filter(parking => !parking.returned)
                .map(parking => (
                  <ListItem
                    key={parking.id}
                    title={parking.plate}
                    subtitle={parking.owner}
                    rightTitle={parking.token}
                    chevron
                    onPress={() => {
                      this.props.navigation.navigate("Return", {
                        parking: parking
                      });
                    }}
                  />
                ));
            }}
          </Query>
        </Card>
      </ScrollView>
    );
  }
}

const PARKING_QUERY = gql`
  query parkings($serviceshiftId: ID!) {
    parkings(serviceshiftId: $serviceshiftId) {
      id
      plate
      owner
      values
      comment
      damage
      sign
      token
      returned
      employee {
        user
      }
    }
  }
`;

export default ServiceScreen;
