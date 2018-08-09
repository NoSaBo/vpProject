// @flow
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import Input from './Input';
import BoxButton from './boxbutton'

import styles from '../style'

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: ''
    };
  }

  handleUser = (text) => {
    this.setState({user: text})
  }

  handlePassword = (text) => {
    this.setState({password: text})
  }

  handleButtonClick = () => {

  }

  render() {
    return (
      <View style={styles.login}>
        <Image style={styles.loginimage}
          source={require('../images/logo.png')}
        />
        <Input
          placeholder={'Usuario'}
          handleInput={this.handleUser}
          secure={false}
        />
        <Input
          placeholder={'Contraseña'}
          handleInput={this.handlePassword}
          secure={true}
        />
        <BoxButton
          title='Iniciar'
          onClick={this.handleButtonClick}
          // disable='true'
        />
      </View>
    );
  }
}
