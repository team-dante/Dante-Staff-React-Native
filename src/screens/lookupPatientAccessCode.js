'use strict';
import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ActivityIndicator, Navigator } from 'react-native';
import firebase from 'firebase';

export default class LookupPatientAccessCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '', lastName: '', error: '', loading: '',
        };
    }

    lookupPatientAccount() {
        console.log("im in lookupPatientAccount");
        // prevent this.props loses values
        let this_props = this.props;
        

        this.setState({ error: '', loading: true });
        const { firstName, lastName } = this.state;

        let fullName = firstName + " " + lastName
        firebase.database().ref('PatientAccounts/')
            .orderByChild('fullName').equalTo(fullName)
            .once("value", function (snapshot) {
                if (snapshot.exists()) {
                    let email = "";
                    let password = "";
                    snapshot.forEach(function(data){
                        email = data.val().email;
                        password = data.val().password;
                    });

                    this_props.navigation.navigate('ShowAccessCode', {
                        none: 'false',
                        fullName: fullName,
                        email: email,
                        password: password,
                    });
                }
                else {
                    console.log("There is no account associated with '" + fullName + "'.")
                    this_props.navigation.navigate('ShowAccessCode', {none: 'true'});
                }
            }, function (error) {
                console.log("error = " + error);
            });

        this.setState({
            firstName: '', lastName: '',
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
                <Text style={styles.text}>Patient's First Name</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={false}
                    autoCapitalize="none"
                    onChangeText={firstName => this.setState({ firstName })}
                    value={this.state.firstName} />
                <Text style={styles.text}>Patient's Last Name</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={false}
                    autoCapitalize="none"
                    onChangeText={lastName => this.setState({ lastName })}
                    value={this.state.lastName} />
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