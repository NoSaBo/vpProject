import React from "react";
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  Image,
  Alert
} from "react-native";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

import Input from "./../../components/input";
import CustomButton from "./../../components/button";
import styles from "./styles";
import moment from "moment";
import "moment/locale/es";

export class EmployeeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async removeItemValues(keys) {
    try {
      await AsyncStorage.multiRemove(keys);
      return true;
    } catch (exception) {
      return false;
    }
  }

  handleLogout = () => {
    if (this.removeItemValues(["shiftid", "branch", "begindate", "workspan"]))
      this.props.navigation.navigate("Home", {});
  };

  render() {
    // const { user } = this.props.data;
    const { branch, begindate, workspan } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <View style={styles.label}>
          <View>
            <Text style={styles.content}> {branch} </Text>
          </View>
          <View>
            <Text style={styles.content}>
              {moment(begindate).format("DD [de] MMMM")}
            </Text>
            <Text style={styles.content}>
              {moment(begindate).format("HH:mm")} -{" "}
              {moment(workspan).format("HH:mm")}
            </Text>
          </View>
        </View>
        <View style={styles.block}>
          <CustomButton
            title="Finalizar Turno"
            onClick={this.handleLogout}
            size="Normal"
          />
        </View>
      </View>
    );
  }
}

// const SHIFT_QUERY = gql`
//   {
//     user @client
//   }
// `;

// export default graphql(SHIFT_QUERY)(EmployeeScreen);
export default EmployeeScreen;
