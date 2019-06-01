import React, { Component } from 'react';
import { Image, View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import firebase from 'firebase';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Actions } from 'react-native-router-flux';

export default class QrScanner extends Component {
    constructor(props) {
        super(props);
    }

    onSuccess(e) {

        console.log(e);
        console.log("phoneNumber = " + phoneNumber);

        // get first part before @email.com
        let user = firebase.auth().currentUser;
        console.log(user);
        let phoneNumber = user.email.split('@')[0];

            if(e.data == 'wr-start' || e.data == 'wr-end') {
                this.updateDoctorLocation(phoneNumber, "Waiting Room");
            }
            else if (e.data == 'er-start' || e.data == 'er-end') {
                this.updateDoctorLocation(phoneNumber, "Exam Room");
            }
            else if (e.data == 'tr1-start' || e.data == 'tr1-end') {
                this.updateDoctorLocation(phoneNumber, "Treatment Room 1");
            }
            else if (e.data == 'tr2-start' || e.data == 'tr2-end') {
                this.updateDoctorLocation(phoneNumber, "Treatment Room 2");
            }
            else if (e.data == 'ct-start' || e.data == 'ct-end') {
                this.updateDoctorLocation(phoneNumber, "CT Room");
            }
            else if (e.data == 'private') {
                this.updateDoctorLocation(phoneNumber, "private");
            }
            else {
                this.invalidQrCode();
            }
}

invalidQrCode() {
    Alert.alert(
        'Error',
        'Unrecognized QR code',
        [
            { text: 'Close', onPress: () => { Actions.main(); } }
        ]
    )
}

updateDoctorLocation(phoneNumber, roomId) {
    firebase.database().ref('/DoctorLocation/' + phoneNumber).update({
        room: roomId
    }).then((data) => {
        console.log("successfully updating roomId for doctor " + phoneNumber);
        if (roomId != "private"){
            Alert.alert(
                'Confirm',
                'You are checked out at ' + roomId,
                [
                    { text: 'Close', onPress: () => { Actions.main(); } }
                ]
            )
        }
        else {
            Alert.alert(
                'Confirm',
                'Your location is no longer displayed on Dante Patient app',
                [
                    { text: 'Close', onPress: () => { Actions.main(); } }
                ]
            )
        }

    }).catch((error) => {
        console.log("error updating roomId for doctor " + phoneNumber);
        console.log("error = " + error);
    })
}

render() {
    return (
        <QRCodeScanner
            ref={(node) => { this.scanner = node }}
            onRead={this.onSuccess.bind(this)}
            cameraStyle={{ height: Dimensions.get("window").height }}
        />
    );
}
}
