import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import SignatureScreen from "./react-native-signature-canvas";

export default class Signature extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <SignatureScreen onOK={this.props.handle} sign={this.props.signature} />
      </View>
    );
  }
}
