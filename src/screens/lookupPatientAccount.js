'use strict';
import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ActivityIndicator, Navigator } from 'react-native';
import firebase from 'firebase';

export default class LookupPatientAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // patientPhoneNumber = phoneNumber + @email.com
            phoneNumber: '', error: '', loading: '',
        };
    }

    lookupPatientAccount() {
        console.log("im in lookupPatientAccount");
        // prevent this.props loses values
        let this_props = this.props;


        this.setState({ error: '', loading: true });
        let { phoneNumber } = this.state;
        
        firebase.database().ref('PatientAccounts/')
            .orderByChild('patientPhoneNumber').equalTo(phoneNumber)
            .once("value", function (snapshot) {
                if (snapshot.exists()) {
                    let firstName = '';
                    let lastName = '';
                    let patientPin = "";
                    snapshot.forEach(function (data) {
                        firstName = data.val().firstName;
                        lastName = data.val().lastName;
                        patientPin = data.val().patientPin;
                    });

                    this_props.navigation.navigate('ShowPatientAccount', {
                        none: 'false',
                        firstName: firstName,
                        lastName: lastName,
                        patientPhoneNumber: phoneNumber,
                        patientPin: patientPin,
                    });
                }
                else {
                    console.log("There is no account associated with '" + phoneNumber + "'.")
                    this_props.navigation.navigate('ShowPatientAccount', { none: 'true', patientPhoneNumber: phoneNumber });
                }
            }, function (error) {
                console.log("error = " + error);
            });

        this.setState({
            phoneNumber: '',
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    text: {
        alignSelf: 'flex-start',
        paddingLeft: 60
    },
    input: {
        width: 300,
        height: 40,
        borderColor: "#BEBEBE",
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 20
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