import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Button, StyleSheet, StatusBar } from 'react-native';
import TouchID from 'react-native-touch-id';

export default class StaffLogin extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          checkedCredentials: false
        };
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
        const { checkedCredentials } = this.state;
        if (checkedCredentials) {
            this.props.navigation.navigate('StaffWelcome');
        }
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Username</Text>
                <TextInput style={styles.input} />
                <Text style={styles.text}>Password</Text>
                <TextInput style={styles.input}
                    secureTextEntry />
                <TouchableOpacity style={styles.buttonContainer}
                    onPress={() => this.props.navigation.navigate('StaffWelcome')}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer}
                    onPress={ this._pressHandler.bind(this) }>
                    <Text style={styles.buttonText}>Login with Face/Touch ID</Text>
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
