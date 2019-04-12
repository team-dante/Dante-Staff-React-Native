
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class HomeScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to Dante App!</Text>
                <Text style={styles.instructions}>To get started, please choose approriate role.</Text>
                <TouchableOpacity
                    style={styles.staffButton}
                    onPress={() => this.props.navigation.navigate('StaffLogin')}>
                    <Text style={styles.staffText}>Staff</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.patientButton}
                    onPress={() => { }}>
                    <Text style={styles.patientText}>Patient</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    staffButton: {
        backgroundColor: '#68a0cf',
        borderRadius: 10,
        borderColor: '#fff',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        marginBottom: 10,
    },
    staffText: {
        color: '#fff',
        textAlign: 'center',
    },
    patientButton: {
        backgroundColor: '#68a0cf',
        borderRadius: 10,
        borderColor: '#fff',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        marginBottom: 10,
    },
    patientText: {
        color: '#fff',
        textAlign: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
