import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Button, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import TouchID from 'react-native-touch-id';
import firebase from 'firebase';

export default class StaffLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', error: '', loading: ''};
    }

    componentWillMount() {
        console.log("im in componentWillMount");

        let firstTrigger = true;

        // this will check if the user is logged in or not
        firebase.auth().onAuthStateChanged((user) => {
            console.log("firebase.auth().onAuthStateChanged is called...");
            if (user && firstTrigger) {
                const optionalConfigObject = {
                    fallbackLabel: 'Show Passcode',
                    unifiedErrors: false,
                    passcodeFallback: false,
                };
                console.log("user is logged in")
                console.log("starting authentication");
                TouchID.authenticate('to demo this react-native component', optionalConfigObject)
                    .then(success => {
                        console.log('Authenticated Successfully');
                        console.log("success = " + success);
                        this.props.navigation.navigate('StaffWelcome');
                    })
                    .catch(error => {
                        console.log('Authentication Failed');
                        console.log("error = " + error);
                    });
            }
            else {
                firstTrigger = false;
                console.log("firstTrigger=" + firstTrigger);
                console.log("user is not logged in");
            }
        });
    }

    onButtonPress() {
        this.setState({ error: '', loading: true })
        const { email, password } = this.state;
        console.log('email = ' + this.state.email);
        console.log('password = ' + this.state.password);

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => { this.onLoginSuccess.bind(this)(user); })
            .catch((error) => {
                this.onLoginFailure.bind(this)(error);
            });
    }
    onLoginSuccess(user) {
        console.log("SUCCESS");
        console.log(user)
        this.setState({
            email: '', password: '', error: '', loading: false
        });
        this.props.navigation.navigate('StaffWelcome');
    }

    onLoginFailure(errorParam) {
        console.log("FAILURE");

        let errorCode = errorParam.code;
        let errorMessage = errorParam.message;

        console.log("errorCode = " + errorCode);
        console.log("errorMessage = " + errorMessage);

        this.setState({ error: errorMessage, loading: false });
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
                    onPress={this.onButtonPress.bind(this)}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            )
        }
    }

    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.text}>Staff Email</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={false}
                    autoCapitalize="none"
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email} />
                <Text style={styles.text}>Staff Password</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password} />
                <Text>Future sign in will use Touch/Face ID</Text>
                {this.renderButton()}

                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>
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
    },
    errorTextStyle: {
        fontSize: 16,
        textAlign: 'center',
        color: 'red'
    },
});
