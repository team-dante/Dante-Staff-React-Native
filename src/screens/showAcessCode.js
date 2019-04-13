import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert, Button, StyleSheet, StatusBar} from 'react-native';

export default class ShowAccessCode extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.bigText}>Here is the patient's access code: </Text>
                <Text style={styles.bigText}>20469358</Text>
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
});