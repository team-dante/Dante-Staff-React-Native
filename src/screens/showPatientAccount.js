import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Button, StyleSheet, StatusBar } from 'react-native';

export default class ShowPatientAccount extends React.Component {
    render() {
        let none = this.props.navigation.getParam('none', '');
        let firstName = this.props.navigation.getParam('firstName', '');
        let lastName = this.props.navigation.getParam('lastName', '');
        let patientPhoneNumber = this.props.navigation.getParam('patientPhoneNumber', '');
        let patientPin = this.props.navigation.getParam('patientPin', '');

        if (none == 'true') {
            return (
                <View style={styles.container}>
                    <Text style={styles.bigText}>There is no account associated with {JSON.stringify(patientPhoneNumber)} </Text>
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
                    <Text style={styles.bigText}>Here is patient's account details: </Text>
                    <Text style={styles.bigText}>First name: {JSON.stringify(firstName)}</Text>
                    <Text style={styles.bigText}>Last name: {JSON.stringify(lastName)}</Text>
                    <Text style={styles.bigText}>Phone number: {JSON.stringify(patientPhoneNumber)}</Text>
                    <Text style={styles.bigText}>6-digit pin: {JSON.stringify(patientPin)}</Text>
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
