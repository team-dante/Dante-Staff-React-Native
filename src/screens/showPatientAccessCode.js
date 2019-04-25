import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Button, StyleSheet, ActivityIndicator } from 'react-native';
import firebase from 'firebase';

export default class ShowPatientAccessCode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: '', error: ''
        };

        let none = '';
        let fullName = '';
        let email = '';
        let password = '';
    }

    renderAll() {
        if (this.state.loading) {
            return (
                <View>
                    <ActivityIndicator size={"small"} />
                </View>
            )
        }
        else {
            return (
                <View style={styles.container}>
                    <Text style={styles.bigText}>Here are your account details: </Text>
                    <Text style={styles.bigText}>Full Name: {JSON.stringify(fullName)}</Text>
                    <Text style={styles.bigText}>Email: {JSON.stringify(email)}</Text>
                    <Text style={styles.bigText}>Password: {JSON.stringify(password)}</Text>
                    <Text style={styles.bigText}>Please save this information before you login!</Text>
                    <TouchableOpacity style={styles.buttonContainer}
                        onPress={() => {
                            firebase.auth().createUserWithEmailAndPassword(email, password)
                                .then((user) => {
                                    console.log("SUCCESS signing up");
                                    firebase.auth().signInWithEmailAndPassword(email, password)
                                        .then((user) => {
                                            console.log("SUCCESS signing in");
                                            console.log(user)
                                            this.setState({
                                                error: '', loading: false
                                            });
                                            fullName = '';
                                            email = '';
                                            password = '';
                                            
                                            this.props.navigation.navigate('PatientWelcome');
                                        })
                                        .catch((error) => {
                                            console.log("FAILURE signing in");

                                            let errorCode = error.code;
                                            let errorMessage = error.message;

                                            console.log("errorCode = " + errorCode);
                                            console.log("errorMessage = " + errorMessage);

                                            this.setState({ error: errorMessage, loading: false });
                                        });
                                })
                                .catch((error) => {
                                    console.log("FAILURE signing up");

                                    let errorCode = error.code;
                                    let errorMessage = error.message;

                                    console.log("errorCode = " + errorCode);
                                    console.log("errorMessage = " + errorMessage);

                                    this.setState({ error: errorMessage, loading: false });
                                })
                        }}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }
    render() {
        none = this.props.navigation.getParam('none', '');
        fullName = this.props.navigation.getParam('fullName', '');
        email = this.props.navigation.getParam('email', '');
        password = this.props.navigation.getParam('password', '');

        if (none == 'true') {
            return (
                <View style={styles.container}>
                    <Text style={styles.bigText}>Patient's email activation is incorrect. Please contact the staff.</Text>
                    <TouchableOpacity style={styles.buttonContainer}
                        onPress={() => this.props.navigation.navigate('PatientSignUp')}>
                        <Text style={styles.buttonText}>Return to Patient Signup</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        else {
            return (this.renderAll());
        }
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
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
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