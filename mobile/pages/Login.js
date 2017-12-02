
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import LoginForm from '../components/LoginForm';
import LoginUpper from '../components/LoginUpper';

export default class Login extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <LoginUpper style={styles.upper} />
                    <LoginForm style={styles.form} />
                </View>
                <Image source={require('../content/CityLogo.png')} style={{width: 400, height: 200}}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#b7e9ff',
    },
    upper: {
        marginTop: 140,
        marginBottom: 50,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    form: {
        paddingHorizontal: 50
    }
});
