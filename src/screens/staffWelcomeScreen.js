'use strict';
import React, { Component } from 'react';
import { Alert, StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

class StaffWelcome extends Component {
    constructor(props) {
        super(props);
        // email = phoneNumber + @email.com
        this.state = { staffName: '' };
    }
    componentDidMount() {
        // locate current user's phone num
        let user = firebase.auth().currentUser;
        let phoneNum = user.email.split("@")[0];
        // this keyword would not work under callback fxn
        var self = this;

        // search for the staff obj that has the same phoneNum as currentUser has
        firebase.database().ref(`/staffs/`).orderByChild("phoneNum").equalTo(phoneNum)
            .once('value', function (snapshot) {
                let firstName = '';
                snapshot.forEach(function (data) {
                    firstName = data.val().firstName;
                });
                self.setState({ staffName: firstName });
            });
    }

    render() {
        const { staffName } = this.state;
        return (
            <View style={styles.container}>
                <Text style={styles.topText}>Greetings, Staff {staffName}</Text>
                <Text style={styles.bottomText}>Services for Patients</Text>
                <TouchableOpacity style={styles.buttonContainer}
                    onPress={() => Actions.generatePatientAccount()}>
                    <Text style={styles.buttonText}>Generate Patient's Account</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer}
                    onPress={() => Actions.lookupPatientAccount()}>
                    <Text style={styles.buttonText}>Look up Patient's Account</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer}
                    onPress={() => {
                        Alert.alert(
                            'Warning',
                            'Signing out will disable Face/Touch ID for future login. You will have to type credentials manually to sign in.',
                            [
                                {
                                    text: "Sign me out", onPress: () => {
                                        firebase.auth().signOut()
                                            .then(() => { console.log("sign out successfully."); })
                                            .catch((error) => {
                                                console.log(error);
                                            })
                                        Actions.auth();
                                    }
                                },
                                { text: "Don't sign me out", onDismiss: () => { } }
                            ]
                        );
                    }}>
                    <Text style={styles.buttonText}>Log Out</Text>
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
        backgroundColor: '#fcfcfc'
    },
    topText: {
        fontSize: 30,
        margin: 5,
        fontWeight: 'bold',
        textShadowColor: '#c4c4c4',
        textShadowOffset: { width: 1, height: 0 },
        textShadowRadius: 2
    },
    bottomText: {
        fontSize: 20,
        margin: 10,
        textAlign: "center",
    },
    buttonContainer: {
        backgroundColor: "#428AF8",
        paddingVertical: 12,
        width: Dimensions.get('window').width - 80,
        borderRadius: 8,
        borderColor: "rgba(255,255,255,0.7)",
        margin: 10,
    },
    buttonText: {
        color: "#FFF",
        textAlign: "center",
        height: 20,
        fontWeight: 'bold'
    }
});

export default StaffWelcome;