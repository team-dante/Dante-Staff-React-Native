'use strict';
import React, { Component } from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert, } from 'react-native';
import firebase from 'firebase';

export default class StaffLogin extends React.Component {
    logOut() {
        Alert.alert(
            'Warning',
            'Signing out will disable Face/Touch ID for future login. You will have to type credentials manually to sign in.',
            [
                {text: "Sign me out", onPress: () => {
                    firebase.auth().signOut()
                    .then( () => { console.log("sign out successfully."); } )
                    .catch( (error) => {
                        console.log(error);
                    })
                    this.props.navigation.navigate('HomeScreen');
                } },
                {text: "Don't sign me out", onDismiss: () => {} }
            ]
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.bigText}>Hi, Staff XYZ</Text>
                <Text style={styles.smallText}>What would you like to do?</Text>
                <TouchableOpacity style={styles.buttonContainer} 
                     onPress={() => this.props.navigation.navigate('GeneratePatientAccessCode')}>
                    <Text style={styles.buttonText}>Generate Patient's Account</Text>
                </TouchableOpacity> 
                <TouchableOpacity style={styles.buttonContainer} 
                     onPress={() => this.props.navigation.navigate('LookupPatientAccessCode')}>
                    <Text style={styles.buttonText}>Look up Patient's Account</Text>
                </TouchableOpacity> 
                <TouchableOpacity style={styles.buttonContainer} 
                     onPress={ this.logOut.bind(this) }>
                    <Text style={styles.buttonText}>Log out</Text>
                </TouchableOpacity> 
            </View>
        );
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
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
    },
    smallText: {
        fontSize: 15,
        textAlign: 'center',
        color: '#333333',
        margin: 10,
    },
    buttonContainer : {
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