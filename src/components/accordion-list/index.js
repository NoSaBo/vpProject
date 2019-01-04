import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
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
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Tus Turnos</Text>
        <View>
          <Accordion
            sections={this.props.sections}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
          />
        </View>
      </View>
    );
  }
}
