/* @flow */
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Accordion from "react-native-collapsible/Accordion";

import AccordionHeader from "./../accordion-header";
import AccordionContent from "./../accordion-content";

import styles from "./styles";

const SECTIONS = [
  {
    title: "Sede1",
    date: "08-10",
    address: "Direccion: Av. Lorem ipsum 999",
    begin: "14:00",
    end: "18:00"
  },
  {
    title: "Sede2",
    date: "08-10",
    address: "Direccion: Av. Lorem ipsum 999",
    begin: "14:00",
    end: "18:00"
  },
  {
    title: "Sede3",
    date: "08-10",
    address: "Direccion: Av. Lorem ipsum 999",
    begin: "14:00",
    end: "18:00"
  },
  {
    title: "Sede4",
    date: "08-10",
    address: "Direccion: Av. Lorem ipsum 999",
    begin: "14:00",
    end: "18:00"
  }
];

type Props = {};

export default class AccordionList extends React.Component<Props> {
  _renderHeader(section) {
    return <AccordionHeader title={section.title} date={section.date} />;
  }

  _renderContent(section) {
    return (
      <AccordionContent
        address={section.address}
        begin={section.begin}
        end={section.end}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Turnos Disponibles</Text>
        <View>
          <Accordion
            sections={SECTIONS}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
          />
        </View>
      </View>
    );
  }
}
