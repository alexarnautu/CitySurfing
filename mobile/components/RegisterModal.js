import React, { Component } from 'react';
import { StyleSheet, Modal, Text, TextInput, View, Button, ToastAndroid } from 'react-native';
import AuthenticationService from '../services/AuthenticationService'

export default class ModalExample extends Component {

    authService = new AuthenticationService({
        scope: this,

        registerSuccess: function(resp) {
            switch(resp.status) {
                case 400:
                    resp.json().then(data => {
                        var inval = "Register form invalid: "
                        for(var key in data.ModelState) {
                            inval += `${key.split('.')[1]}: ${data.ModelState[key].join()}\n`
                        }
                        alert(inval)
                    })
                    break;
                case 200:
                    ToastAndroid.show("Register successful!", ToastAndroid.SHORT)
                    this.props.onRequestClose();
                    break;
            }
        }
        
    })

    constructor(props) {
        super()

        var noop = (() => {});
        props.onRequestClose = props.onRequestClose || noop

        this.props = props;
    }

    state = {
        modalVisible: false
    }

    setModalVisible(modalVisible) {
        this.setState({ modalVisible });
    }

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                style={styles.modal}
                onRequestClose={this.props.onRequestClose}>

                <View style={styles.view}>

                    <Text>Email:</Text>
                    <TextInput style={styles.textInput} onChangeText={email => this.setState({email})} />
                
                    <Text>Full name:</Text>
                    <TextInput style={styles.textInput} onChangeText={fullName => this.setState({fullName})} />

                    <Text>Phone number:</Text>
                    <TextInput style={styles.textInput} onChangeText={phoneNumber => this.setState({phoneNumber})} />

                    <Text>Password:</Text>
                    <TextInput style={styles.textInput} secureTextEntry onChangeText={password => this.setState({password})} />

                    <Text>Confirm password:</Text>
                    <TextInput style={styles.textInput} secureTextEntry onChangeText={passwordConfirm => this.setState({passwordConfirm})} />

                    <Text>About: </Text>
                    <TextInput style={styles.textInput} onChangeText={about => this.setState({about})} multiline />

                    <View style={{flexDirection: 'row'}}>
                        <Button title="Register" onPress={this.onRegisterSubmit.bind(this)}/>
                    </View>

                </View>

            </Modal>

        );
    }

    onRegisterSubmit() {
        this.authService.register(this.state)
    }
}

const styles = StyleSheet.create({

    view: {
        marginHorizontal: 40,
        marginTop: 15,
        backgroundColor: '#b7e9ff'
    },

    modal: {
    },

    textInput: {
        marginBottom: 10
    }

})