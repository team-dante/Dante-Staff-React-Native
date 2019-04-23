import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Button, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import TouchID from 'react-native-touch-id';
import firebase from 'firebase';

export default class StaffLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', error: '' };
    }

    onButtonPress() {
        this.setState({ error: '', loading: true })
        const { email, password } = this.state;
        console.log('email = ' + this.state.email);
        console.log('password = ' + this.state.password);
        
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then( (user) => { this.onLoginSuccess.bind(this)(user); })
            .catch( (error) => {
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

    _pressHandler() {

        const optionalConfigObject = {
            unifiedErrors: false, // use unified error messages (default false)
            passcodeFallback: false // if true is passed, itwill allow isSupported to return an error if the device is not enrolled in touch id/face id etc. Otherwise, it will just tell you what method is supported, even if the user is not enrolled.  (default false)
        }

        TouchID.isSupported(optionalConfigObject)
            .then(biometryType => {
                // Success code
                TouchID.authenticate('to demo this react-native component', optionalConfigObject)
                    // any kind of error you have inside the then() callback it will be caught by the "catch" callback
                    .then(success => {
                        console.log('Authenticated Successfully');
                        console.log("success = " + success);
                        this.props.navigation.navigate('StaffWelcome');
                    })
                    .catch(error => {
                        console.log('Authentication Failed');
                        console.log("error = " + error);
                    });
                if (biometryType === 'FaceID') {
                    console.log('FaceID is supported.');
                } else {
                    console.log('TouchID is supported.');
                }
            })
            .catch(error => {
                // Failure code
                console.log(error);
            });
    }

    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.text}>Username</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={false}
                    autoCapitalize="none"
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email} />
                <Text style={styles.text}>Password</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password} />

                {this.renderButton()}

                <TouchableOpacity style={styles.buttonContainer}
                    onPress={this._pressHandler.bind(this)}>
                    <Text style={styles.buttonText}>Login with Face/Touch ID</Text>
                </TouchableOpacity>

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
