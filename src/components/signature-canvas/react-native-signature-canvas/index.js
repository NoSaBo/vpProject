import React, { Component } from "react";
import { View, StyleSheet, WebView } from "react-native";

import htmlContentSign from "./h5/html-sign";
import htmlContentDamage from "./h5/html-damage";
import injectedSignaturePad from "./h5/js/signature_pad";
import injectedApplication from "./h5/js/app";

const styles = StyleSheet.create({
  signature: {
    width: 200,
    height: 110,
    borderWidth: 2,
    borderColor: "grey"
  },
  signaturBg: {
    alignItems: "center",
    marginTop: 20
  },
  webView: {},
  webBg: {
    width: "100%",
    paddingTop: 20,
    backgroundColor: "#FFF",
    flex: 1
  }
});

class SignatureView extends Component {
  static defaultProps = {
    style: styles.webView,
    webBgStyle: styles.webBg,
    activeOpacity: 0.8
  };

  constructor(props) {
    super(props);
    this.state = { base64DataUrl: props.dataURL || null };
    this.state = { sign: props.sign || true };
    const { backgroundColor } = StyleSheet.flatten(props.style);
    const injectedJavaScript = injectedSignaturePad + injectedApplication;
    let html = htmlContentDamage(injectedJavaScript);
    if (this.props.sign) {
      html = htmlContentSign(injectedJavaScript);
    }
    this.source = { html };
  }

  state = {
    bridgeJs: `
        (function ready() {
          saveButton.addEventListener("click", function (event) {
            if (signaturePad.isEmpty()) {
                alert("Por favor realizar su firma.");
            } else {
                window.postMessage(signaturePad.toDataURL());
            }
          });
        })();`
  };

  getSignature = e => {
    const { onOK } = this.props;
    onOK(e.nativeEvent.data);
  };

  _renderError = args => {
    console.log("error", args);
  };

  render() {
    return (
      <View style={styles.webBg}>
        <WebView
          style={styles.webView}
          source={this.source}
          onMessage={this.getSignature}
          javaScriptEnabled={true}
          onError={this._renderError}
        />
      </View>
    );
  }
}

export default SignatureView;
