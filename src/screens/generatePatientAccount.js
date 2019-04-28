'use strict';
import React, { Component } from 'react';
import {StyleSheet, View, Text, TouchableOpacity, TextInput, Alert, ActivityIndicator, Dimensions} from 'react-native';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export default class GeneratePatientAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '', lastName: '', patientPhoneNumber: '', patientPin: '', error: '', loading: ''
        };
    }

    hashing(key) {
        let hashVal = 0; 
        for (let i = 0; i < key.length; ++i)
          hashVal = (127 * hashVal + key.charCodeAt(i)) % 16908799;
        return hashVal;
    }

    generatePatientAccount() {
        this.setState({ error: '', loading: true });
        let { firstName, lastName, patientPhoneNumber, patientPin } = this.state;
        
        let fullName = firstName + " " + lastName;
        let genPin = this.hashing(fullName);

        var self = this;
        firebase.database().ref(`/Patients`).push({
            firstName: firstName,
            lastName: lastName,
            patientPhoneNumber: patientPhoneNumber,
            patientPin: genPin
        }).then((data) => {
            console.log("data = " + data);
            Alert.alert(
                'Confirmation',
                'Patient\'s account is created',
                [
                    { text: "View Account", onPress: () => { 
                        Actions.showAcct({
                            firstName: firstName,
                            lastName: lastName,
                            patientPhoneNumber: patientPhoneNumber,
                            patientPin: genPin
                        }) 
                    } }
                ]
            );
            self.setState({
                firstName: '', lastName: '', patientPhoneNumber: '', patientPin: '', error: '', loading: ''
            });
        }).catch((error) => {
            console.log("error = " + error);
            Alert.alert(
                'Error',
                'Patient\'s account is not successfully created',
                [
                    { text: "Close", onPress: () => {} }
                ]
            );
        })
    }

    renderButton() {
        if (this.state.loading) {
            return (
                <View>
                    <ActivityIndicator size={"small"} />
                </View>
            )
        }
        else 
        {
            return (
                <TouchableOpacity style={styles.buttonContainer} 
                    onPress={ this.generatePatientAccount.bind(this) }>
                    <Text style={styles.buttonText}>Generate Patient Account</Text>
                </TouchableOpacity> 
            );
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.header}>Enter Patient Info</Text>
                <Text style={styles.text}>Patient's First Name</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={false}
                    onChangeText={ firstName => this.setState({ firstName })}
                    value={this.state.firstName} />
                <Text style={styles.text}>Patient's Last Name</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={false}
                    onChangeText={ lastName => this.setState({ lastName })}
                    value={this.state.lastName} />
                <Text style={styles.text}>Patient's Phone Number</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={false}
                    autoCapitalize="none"
                    onChangeText={ patientPhoneNumber => this.setState({ patientPhoneNumber })}
                    value={this.state.patientPhoneNumber} />
                { this.renderButton() }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        alignSelf: 'flex-start',
        paddingVertical: 40,
        paddingLeft: 40,
        fontSize: 26,
        fontWeight: 'bold',
        textShadowColor: '#c4c4c4',
        textShadowOffset: { width: 1, height: 0 },
        textShadowRadius: 2
    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 40,
        backgroundColor: '#ffffff',
    },
    text: {
        alignSelf: 'flex-start',
        paddingLeft: 40,
        paddingRight: 40,
        color: '#96A0AF',
        fontSize: 16,
        textShadowColor: '#c4c4c4',
        textShadowOffset: { width: 0.5, height: 0 },
        textShadowRadius: 1,
    },
    input: {
        width: Dimensions.get('window').width - 80,
        height: 46,
        borderColor: "#96A0AF",
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 20,
        fontSize: 18
    },
    buttonContainer : {
        backgroundColor: "#428AF8",
        paddingVertical: 12,
        width: Dimensions.get('window').width - 80,
        borderRadius: 8,
        borderColor: "rgba(255,255,255,0.7)",
        margin: 10,
    },
    buttonText: {
        color: "#FFF",
        textAlign: "center",
        height: 20,
        fontWeight: 'bold'
    }
});