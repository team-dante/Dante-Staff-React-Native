import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Button, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import firebase from 'firebase';

export default class PatientSignUp extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', error: '', loading: '' };
    }

    activateAccount() {
        const { email } = this.state;
        // prevent this.props loses values
        let this_props = this.props;

        this.setState({ error: '', loading: true });
        firebase.database().ref('PatientAccounts/')
            .orderByChild('email').equalTo(email)
            .once("value", function (snapshot) {
                if (snapshot.exists()) {
                    let fullName = "";
                    let password = "";
                    snapshot.forEach(function (data) {
                        fullName = data.val().fullName;
                        password = data.val().password;
                    });

                    this_props.navigation.navigate('ShowPatientAccessCode', {
                        none: 'false',
                        fullName: fullName,
                        email: email,
                        password: password,
                    });
                }
                else {
                    console.log("There is no account associated with '" + email + "'.")
                    this_props.navigation.navigate('ShowPatientAccessCode', { none: 'true' });
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
        } else {
            return (
                <TouchableOpacity style={styles.buttonContainer}
                    onPress={this.activateAccount.bind(this)}>
                    <Text style={styles.buttonText}>Activate my account</Text>
                </TouchableOpacity>
            )
        }
    }

    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.text}>Patient Email</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={false}
                    autoCapitalize="none"
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email} />
                <Text>Please enter email given to you by the staff</Text>
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
