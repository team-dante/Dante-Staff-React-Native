'use strict';
import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, Text, TouchableOpacity, TextInput, ActivityIndicator, Alert, Keyboard, SafeAreaView, Platform, KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
            .once('value', function (snapshot) {
                let firstName = '';
                let lastName = '';
                let patientPin = '';
                let founded = false;

                // if founded
                snapshot.forEach(function (data) {
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
                        'Error',
                        'Patient\'s account cannot be found',
                        [
                            {
                                text: "Close", onPress: () => {
                                    self.setState({ phoneNumber: '', loading: false });
                                }
                            }
                        ]
                    );
                }
            }, function (error) {
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
        const shouldSetResponse = () => true;
        const onRelease = () => (
            Keyboard.dismiss()
        );
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
                style={{ flex: 1 }} >
                <SafeAreaView style={styles.container}>
                    <View
                        onResponderRelease={onRelease}
                        onStartShouldSetResponder={shouldSetResponse}
                        style={{ height: hp('100%') }} style={styles.inner}>
                        <View style={styles.container}>
                            <Text style={styles.text}>Patient's Phone Number</Text>
                            <TextInput
                                style={styles.input}
                                secureTextEntry={false}
                                autoCapitalize="none"
                                keyboardType='numeric'
                                onChangeText={phoneNumber => this.setState({ phoneNumber })}
                                value={this.state.phoneNumber} />
                            {this.renderButton()}
                        </View>
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    inner: {
        paddingBottom: hp('1%'),
        flex: 1,
        justifyContent: "flex-end",
    },
    text: {
        alignSelf: 'flex-start',
        paddingLeft: 40,
        paddingRight: 40,
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
        fontSize: 18,
        marginLeft: wp('10%')
    },
    buttonContainer: {
        backgroundColor: "#428AF8",
        paddingVertical: 12,
        width: Dimensions.get('window').width - 80,
        borderRadius: 8,
        borderColor: "rgba(255,255,255,0.7)",
        margin: 10,
        marginLeft: wp('10%')
    },
    buttonText: {
        color: "#FFF",
        textAlign: "center",
        height: 20,
        fontWeight: 'bold'
    }
});