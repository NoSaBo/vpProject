/* @flow */
import React from "react";
import { View, ScrollView, Text } from "react-native";
import CustomButton from "./../../components/button";
import AccordionList from "./../../components/accordion-list";
import styles from "./styles";

type Props = {
  user: string
};

type State = {};

export default class HomeScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  handleLogout = () => {
    this.props.navigation.navigate("Login");
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <Text style={styles.welcome}> Bienvenido </Text>
          </View>
          <View>
            <CustomButton title="Cerrar Sesión" onClick={this.handleLogout} />
          </View>
          <View>
            <AccordionList />
          </View>
        </ScrollView>
      </View>
    );
  }
}