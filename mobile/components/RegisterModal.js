import React, { Component } from 'react';
import { StyleSheet, Modal, Text, TextInput, View, Button } from 'react-native';

export default class ModalExample extends Component {


    constructor(props) {
        super()

        var noop = (() => {});
        props.onRequestClose = props.onRequestClose || noop

        this.props = props;
    }

    state = {
        modalVisible: false,
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
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
                    <TextInput style={styles.textInput} />
                
                    <Text>Full name:</Text>
                    <TextInput style={styles.textInput} />

                    <Text>Phone number:</Text>
                    <TextInput style={styles.textInput} />

                    <Text>Password:</Text>
                    <TextInput style={styles.textInput} secureTextEntry />

                    <Text>Confirm password:</Text>
                    <TextInput style={styles.textInput} secureTextEntry />

                    <Text>About: </Text>
                    <TextInput style={styles.textInput} />

                    <View style={{flexDirection: 'row'}}>
                        <Button title="Register"/>
                    </View>

                </View>

            </Modal>

        );
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