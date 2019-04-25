import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Button, StyleSheet, StatusBar } from 'react-native';

export default class ShowStaffAccessCode extends React.Component {
    render() {
        let none = this.props.navigation.getParam('none', '');
        let fullName = this.props.navigation.getParam('fullName', '');
        let email = this.props.navigation.getParam('email', '');
        let password = this.props.navigation.getParam('password', '');

        if (none == 'true') {
            return (
                <View style={styles.container}>
                    <Text style={styles.bigText}>No patient's account found. </Text>
                    <TouchableOpacity style={styles.buttonContainer}
                        onPress={() => this.props.navigation.navigate('StaffWelcome')}>
                        <Text style={styles.buttonText}>Return to Staff Menu</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        else {
            return (
                <View style={styles.container}>
                    <Text style={styles.bigText}>Here are is patient's account details: </Text>
                    <Text style={styles.bigText}>Full Name: {JSON.stringify(fullName)}</Text>
                    <Text style={styles.bigText}>Email: {JSON.stringify(email)}</Text>
                    <Text style={styles.bigText}>Password: {JSON.stringify(password)}</Text>
                    <TouchableOpacity style={styles.buttonContainer}
                        onPress={() => this.props.navigation.navigate('StaffWelcome')}>
                        <Text style={styles.buttonText}>Return to Staff Menu</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    bigText: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    buttonContainer: {
        backgroundColor: "#428AF8",
        paddingVertical: 12,
        width: 300,
        borderRadius: 4,
        borderColor: "rgba(255,255,255,0.7)",
        margin: 10,
    },
    buttonText: {
        color: "#FFF",
        textAlign: "center",
        height: 20
    }
});