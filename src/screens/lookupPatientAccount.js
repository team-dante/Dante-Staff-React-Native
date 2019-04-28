'use strict';
import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, Text, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export default class LookupPatientAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // patientPhoneNumber = phoneNumber + @email.com
            phoneNumber: '', error: '', loading: ''
        };
    }

    lookupPatientAccount() {
        console.log("im in lookupPatientAccount");

        this.setState({ error: '', loading: true });
        let { phoneNumber } = this.state;
        
        var self = this;
        firebase.database().ref(`/Patients`)
            .orderByChild("patientPhoneNumber").equalTo(phoneNumber)
            .once('value', function(snapshot) {
                let firstName = '';
                let lastName = '';
                let patientPin = '';
                let founded = false;

                // if founded
                snapshot.forEach(function(data) {
                    firstName = data.val().firstName;
                    lastName = data.val().lastName;
                    patientPin = data.val().patientPin;
                    Actions.showAcct({
                        firstName: firstName,
                        lastName: lastName,
                        patientPhoneNumber: phoneNumber,
                        patientPin: patientPin
                    });
                    founded = true;
                });
                // if not founded; display an alert box, clear fields
                if (!founded) {
                    Alert.alert(
                        'Warning',
                        'Patient\'s account cannot be found',
                        [
                            { text: "Close", onPress: ()=> {
                                self.setState({phoneNumber: '', loading: false});
                            }}
                        ]
                    );
                }
            }, function(error) {
                console.log("error = " + error);
            });
    }

    renderButton() {
        if (this.state.loading) {
            return (
                <View>
                    <ActivityIndicator size={"small"} />
                </View>
            )
        }
        else {
            return (
                <TouchableOpacity style={styles.buttonContainer}
                    onPress={this.lookupPatientAccount.bind(this)}>
                    <Text style={styles.buttonText}>Look up Patient's Account</Text>
                </TouchableOpacity>
            );
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Patient's Phone Number</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={false}
                    autoCapitalize="none"
                    onChangeText={phoneNumber => this.setState({ phoneNumber })}
                    value={this.state.phoneNumber} />
                {this.renderButton()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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