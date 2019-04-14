import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert, Button, StyleSheet, StatusBar} from 'react-native';

export default class ShowAccessCode extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.bigText}>Here is the patient's access code: </Text>
                <Text style={styles.bigText}>20469358</Text>
                <TouchableOpacity style={styles.buttonContainer} 
                    onPress={() => this.props.navigation.navigate('StaffWelcome')}>
                    <Text  style={styles.buttonText}>Return to Staff Menu</Text>
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