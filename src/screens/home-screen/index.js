/* @flow */
import React from "react";
import {
  AsyncStorage,
  View,
  ScrollView,
  ActivityIndicator
} from "react-native";
import {
  Card,
  Button,
  Input,
  Icon,
  Text,
  ListItem
} from "react-native-elements";
import { graphql } from "react-apollo";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import CustomButton from "./../../components/button";
import AccordionList from "./../../components/accordion-list";
import styles from "./styles";
import {
  COLOR_ALERT,
  COLOR_SECONDARY,
  COLOR_BASE,
  COLOR_PRIMARY
} from "./../../common";

export class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async removeItemValue(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (exception) {
      return false;
    }
  }

  handleLogout = () => {
    if (this.removeItemValue("user")) this.props.navigation.navigate("Login");
  };

  componentDidMount() {
    AsyncStorage.multiGet(["shiftid", "branch", "begindate", "workspan"]).then(
      value => {
        if (value[0][1]) {
          this.props.navigation.navigate("Service", {
            branch: value[1][1],
            begindate: value[2][1],
            workspan: value[3][1]
          });
        }
      }
    );
  }

  render() {
    const user = this.props.navigation.state.params.user;
    return (
      <View style={styles.container}>
        <ScrollView>
          <Card>
            <Text>Bienvenido</Text>
            <Text h4>{this.props.navigation.state.params.name}</Text>
            <Button
              title="Cerrar Sessión"
              icon={
                <Icon
                  type="font-awesome"
                  name="sign-out"
                  size={15}
                  color="white"
                />
              }
              onPress={this.handleLogout}
            />
          </Card>
          <Card
            wrapperStyle={{
              justifyContent: "space-around",
              alignItems: "stretch"
            }}
          >
            <Text h4 style={{ textAlign: "center" }}>
              Tus Turnos Activos
            </Text>
            <Query
              query={HOME_QUERY}
              variables={{ user }}
              pollInterval={10000}
              options={{ fetchPolicy: "cache-and-network" }}
            >
              {({ loading, error, data, refetch, networkStatus }) => {
                if (loading || networkStatus === 4)
                  return (
                    <ActivityIndicator size="large" color={COLOR_PRIMARY} />
                  );
                if (error) return <Text> Error: {error} </Text>;
                const { employees } = data;
                const sections = employees[0].shifts;
                sections.sort((a, b) => {
                  if (a.begindate < b.begindate) return 1;
                  if (a.begindate > b.begindate) return -1;
                  return 0;
                });
                return (
                  <View>
                    <AccordionList
                      sections={sections.filter(section => section.active)}
                      user={user}
                    />
                    <Text h4 style={{ textAlign: "center" }}>
                      Tus Turnos Antiguos
                    </Text>
                    <AccordionList
                      sections={sections.filter(section => !section.active)}
                      user={user}
                    />
                  </View>
                );
              }}
            </Query>
          </Card>
        </ScrollView>
      </View>
    );
  }
}

const HOME_QUERY = gql`
  query employees($user: String!) {
    employees(user: $user) {
      shifts {
        id
        begindate
        workspan
        active
        branch {
          branch
          address
        }
      }
    }
  }
`;

export default HomeScreen;
