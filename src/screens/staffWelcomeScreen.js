'use strict';
import React, { Component } from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

export default class StaffLogin extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.bigText}>Hi, Dr. Dante Roa!</Text>
                <Text style={styles.smallText}>What would you like to do?</Text>
                <TouchableOpacity style={styles.buttonContainer} 
                     onPress={() => {}}>
                    <Text style={styles.buttonText}>Generate Patients' Access Code</Text>
                </TouchableOpacity> 
                <TouchableOpacity style={styles.buttonContainer} 
                     onPress={() => {}}>
                    <Text style={styles.buttonText}>Look up Patients' Access Code</Text>
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