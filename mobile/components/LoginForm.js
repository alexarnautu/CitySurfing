import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator } from 'react-native';
import AuthenticationService from '../services/AuthenticationService'
import RegisterModal from '../components/RegisterModal'

export default class LoginForm extends React.Component {

  authService = new AuthenticationService({
    scope: this,
    loginAlways () {
      this.setState({loading: false});
    },
    beforeLogin () {
      this.setState({loading: true});
    }
  })

  state = {
    loading: false,
    registerMode: false
  }

  render() {
    return (
      <View>
        <View style={this.props.style} ref="loginView">
          <Text>Email:</Text>
          <TextInput style={styles.field} onChangeText={username => this.setState({username})} editable={!this.state.loading}/>

          <Text>Password:</Text>
          <TextInput secureTextEntry style={styles.field} onChangeText={password => this.setState({password})} editable={!this.state.loading}/>

          <View style={{flexDirection: 'row'}}>

            <Button title="Login" style={styles.button} onPress={this.onLoginClick.bind(this)} disabled={this.state.loading}/>
            <ActivityIndicator animating={true} style={{flex: 1, opacity: this.state.loading ? 1.0 : 0.0}}/>
            <Button title="Register" style={styles.button} onPress={this.onRegisterClick.bind(this)} disabled={this.state.loading}/>

          </View>
        </View>
        {
            this.state.registerMode ?
            <RegisterModal onRequestClose={this.onRegisterModalClose.bind(this)}/> : null
        }
      </View>
    );
  }

  onRegisterModalClose() {
    this.setState({registerMode: false})
  }

  onLoginClick() {
    var uname = this.state.username;
    var pass = this.state.password;
    this.authService.login(uname, pass)
  }

  onRegisterClick() {
    this.setState({registerMode: true})
  }

}

const styles = StyleSheet.create({
  button: {
    flex: 2
  },
  field: {
    height: 35
  }
});