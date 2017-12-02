import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';

export default class LoginForm extends React.Component {
  render() {
    return (
      <View style={this.props.style}>
        <Image source={require("../content/SurfingLogo.png")} style={{width: 50, height: 50}}/>
        <Text>Welcome to CitySurfing!</Text>
      </View>
    );
  }
}
