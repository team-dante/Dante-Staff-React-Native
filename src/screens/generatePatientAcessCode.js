'use strict';
import React, { Component } from 'react';
import {StyleSheet, View, Text, TouchableOpacity, TextInput, Alert, ActivityIndicator} from 'react-native';
import firebase from 'firebase';

export default class GeneratePatientAccessCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '', lastName: '', patientEmail: '', patientPassword: '', error: '', loading: ''
        };
    }
    
    generatePatientAccount() {
        this.setState({ error: '', loading: true });
        const { firstName, lastName, patientEmail, patientPassword } = this.state;

        let fullName = firstName + lastName;
        firebase.database().ref('PatientAccounts/').push({
            firstName: firstName,
            lastName: lastName,
            email: patientEmail,
            password: patientPassword,
            fullName: fullName,
        }).then((data) => {
            console.log("data = " + data);
        }).catch((error) => {
            console.log("error = " + error);
        })

        Alert.alert(
            'Confirmation',
            'Patient\'s account is created',
            [
                { text: "Close", onPress: () => { this.props.navigation.navigate('StaffWelcome') } }
            ]
        )

        this.setState({
            patientEmail: '', patientPassword: ''
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
        else 
        {
            return (
                <TouchableOpacity style={styles.buttonContainer} 
                    onPress={ this.generatePatientAccount.bind(this) }>
                    <Text style={styles.buttonText}>Generate Patient Account</Text>
                </TouchableOpacity> 
            );
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.text}>Patient's First Name</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={false}
                    autoCapitalize="none"
                    onChangeText={ firstName => this.setState({ firstName })}
                    value={this.state.firstName} />
                <Text style={styles.text}>Patient's Last Name</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={false}
                    autoCapitalize="none"
                    onChangeText={ lastName => this.setState({ lastName })}
                    value={this.state.lastName} />
                <Text style={styles.text}>Patient Email</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={false}
                    autoCapitalize="none"
                    onChangeText={ patientEmail => this.setState({ patientEmail })}
                    value={this.state.patientEmail} />
                <Text style={styles.text}>Patient Password</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    onChangeText={ patientPassword => this.setState({ patientPassword }) }
                    value={this.state.patientPassword} />
                { this.renderButton() }
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