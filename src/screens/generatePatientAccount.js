'use strict';
import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Alert, ActivityIndicator, Dimensions, Keyboard, SafeAreaView, Platform, KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class GeneratePatientAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '', lastName: '', patientPhoneNumber: '', patientPin: '', error: '', loading: ''
        };
    }

    // hashing(key) {
    //     let hashVal = 0; 
    //     for (let i = 0; i < key.length; ++i)
    //       hashVal = (127 * hashVal + key.charCodeAt(i)) % 16908799;
    //     return hashVal;
    // }

    generatePatientAccount() {
        this.setState({ error: '', loading: true });
        let { firstName, lastName, patientPhoneNumber, patientPin } = this.state;

        let fullName = firstName + " " + lastName;
        // let genPin = (this.hashing(fullName)).toString();

        var self = this;
        firebase.database().ref(`/Patients`).push({
            firstName: firstName,
            lastName: lastName,
            patientPhoneNumber: patientPhoneNumber,
            patientPin: patientPin
        }).then((data) => {
            console.log("data = " + data);
            Alert.alert(
                'Confirmation',
                'Patient\'s account is created',
                [
                    {
                        text: "View Account", onPress: () => {
                            Actions.showAcct({
                                firstName: firstName,
                                lastName: lastName,
                                patientPhoneNumber: patientPhoneNumber,
                                patientPin: patientPin
                            })
                        }
                    }
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
                    { text: "Close", onPress: () => { } }
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
        else {
            return (
                <TouchableOpacity style={styles.buttonContainer}
                    onPress={this.generatePatientAccount.bind(this)}>
                    <Text style={styles.buttonText}>Generate Patient Account</Text>
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
                            <Text style={styles.header}>Enter Patient Information</Text>
                            <Text style={styles.text}>Patient's First Name</Text>
                            <TextInput
                                style={styles.input}
                                secureTextEntry={false}
                                onChangeText={firstName => this.setState({ firstName })}
                                value={this.state.firstName} />
                            <Text style={styles.text}>Patient's Last Name</Text>
                            <TextInput
                                style={styles.input}
                                secureTextEntry={false}
                                onChangeText={lastName => this.setState({ lastName })}
                                value={this.state.lastName} />
                            <Text style={styles.text}>Patient's Phone Number</Text>
                            <TextInput
                                style={styles.input}
                                secureTextEntry={false}
                                autoCapitalize="none"
                                onChangeText={patientPhoneNumber => this.setState({ patientPhoneNumber })}
                                value={this.state.patientPhoneNumber} />
                            <Text style={styles.text}>PIN</Text>
                            <TextInput
                                style={styles.input}
                                secureTextEntry={false}
                                autoCapitalize="none"
                                onChangeText={patientPin => this.setState({ patientPin })}
                                value={this.state.patientPin} />
                            {this.renderButton()}
                        </View>
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        paddingBottom: 30,
        alignSelf: 'flex-start',
        paddingLeft: 40,
        fontSize: 26,
        fontWeight: 'bold',
        textShadowColor: '#c4c4c4',
        textShadowOffset: { width: 1, height: 0 },
        textShadowRadius: 2
    },
    inner: {
        paddingBottom: hp('1%'),
        flex: 1,
        justifyContent: "flex-end",
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingTop: hp('5%')
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