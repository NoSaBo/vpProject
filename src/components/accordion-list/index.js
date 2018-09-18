/* @flow */
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Accordion from "react-native-collapsible/Accordion";

import AccordionHeader from "./../accordion-header";
import AccordionContent from "./../accordion-content";

import styles from "./styles";

type Props = {};

export default class AccordionList extends React.Component<Props> {
  _renderHeader(section) {
    return (
      <AccordionHeader name={section.branch.branchName} date={section.date} />
    );
  }

  _renderContent(section) {
    return (
      <AccordionContent
        address={section.branch.address}
        begin={section.begin}
        end={section.end}
        id={section.id}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Tus Turnos</Text>
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
