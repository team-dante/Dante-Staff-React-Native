import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert, Button, StyleSheet, StatusBar} from 'react-native';

export default class PatientLogin extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>First Name</Text>
                <TextInput style = {styles.input} />
                <Text style={styles.text}>Last Name</Text>
                <TextInput style = {styles.input} /> 
                <Text style={styles.text}>Patient's Access Code</Text>
                <TextInput style = {styles.input} 
                secureTextEntry/>
                <TouchableOpacity style={styles.buttonContainer} 
                    onPress={() => this.props.navigation.navigate('PatientWelcome')}>
                    <Text  style={styles.buttonText}>Login</Text>
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
    text: {
        alignSelf: 'flex-start',
        paddingLeft: 60
    },
    input:{
        width: 300,
        height: 40,
        borderColor: "#BEBEBE",
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 20
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
