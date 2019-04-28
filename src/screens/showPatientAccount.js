import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';

class ShowPatientAccount extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Patient's account details: </Text>
                <Text style={styles.bigText}>First name: {this.props.firstName}</Text>
                <Text style={styles.bigText}>Last name: {this.props.lastName}</Text>
                <Text style={styles.bigText}>Phone number: {this.props.patientPhoneNumber}</Text>
                <Text style={styles.bigText}>PIN number: {this.props.patientPin}</Text>
                <TouchableOpacity style={styles.buttonContainer}
                    onPress={() => Actions.main()}>
                    <Text style={styles.buttonText}>Return to Staff Home</Text>
                </TouchableOpacity>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    header: {
        alignSelf: 'flex-start',
        paddingVertical: 30,
        paddingLeft: 40,
        fontSize: 26,
        fontWeight: 'bold',
        textShadowColor: '#c4c4c4',
        textShadowOffset: { width: 1, height: 0 },
        textShadowRadius: 2
    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 40,
        backgroundColor: '#ffffff',
    },
    bigText: {
        alignSelf: 'flex-start',
        paddingLeft: 40,
        paddingRight: 40,
        paddingVertical: 10,
        color: '#828a96',
        fontSize: 20,
        textShadowColor: '#c4c4c4',
        textShadowOffset: { width: 0.5, height: 0 },
        textShadowRadius: 1
    },
    buttonContainer : {
        backgroundColor: "#428AF8",
        paddingVertical: 12,
        width: Dimensions.get('window').width - 80,
        borderRadius: 8,
        borderColor: "rgba(255,255,255,0.7)",
        marginTop: 30,
    },
    buttonText: {
        color: "#FFF",
        textAlign: "center",
        height: 20,
        fontWeight: 'bold'
    }
});

export default ShowPatientAccount;