import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import {
  Card,
  Button,
  Input,
  Icon,
  Text,
  ListItem
} from "react-native-elements";
import Accordion from "react-native-collapsible/Accordion";

import AccordionHeader from "./../accordion-header";
import AccordionContent from "./../accordion-content";

import styles from "./styles";

export default class AccordionList extends React.Component {
  _renderHeader(section) {
    return (
      <AccordionHeader name={section.branch.branch} date={section.begindate} />
    );
  }

  _renderContent(section) {
    return (
      <AccordionContent
        address={section.branch.address}
        begindate={section.begindate}
        workspan={section.workspan}
        active={section.active}
        id={section.id}
      />
    );
  }

  render() {
    if (!this.props.sections[0])
      return <ListItem subtitle="No tienes turnos asignados" />;
    return (
      <Accordion
        sections={this.props.sections}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
      />
    );
  }
}
