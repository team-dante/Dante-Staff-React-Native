import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert, Button, StyleSheet, StatusBar} from 'react-native';
import TouchID from 'react-native-touch-id';
import firebase from 'firebase';

export default class PatientLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', error: '', loading: ''};
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
        this.props.navigation.navigate('PatientWelcome');
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
                <Text style={styles.text}>Patient Email</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={false}
                    autoCapitalize="none"
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email} />
                <Text style={styles.text}>Patient Password</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password} />
                <Text>Future sign in will use Touch/Face ID</Text>
                {this.renderButton()}
                <Text>New User?</Text>
                <TouchableOpacity style={styles.buttonContainer}
                    onPress={this.props.navigation.navigate('PatientSignUp')}>
                    <Text style={styles.buttonText}>Activate my account</Text>
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
