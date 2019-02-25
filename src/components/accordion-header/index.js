import React from "react";
import { View } from "react-native";
import moment from "moment";
import "moment/locale/es";

import styles from "./styles";
import { ListItem, Text } from "react-native-elements";

export default class AccordionHeader extends React.Component {
  render() {
    const shiftDate = new Date(this.props.date);
    return (
      <ListItem
        title={this.props.name}
        subtitle={moment(shiftDate).format("dddd, DD [de] MMMM")}
        rightSubtitle={moment(shiftDate).format("h:mm a")}
      />
    );
  }
}
