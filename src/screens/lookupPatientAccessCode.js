'use strict';
import React, { Component } from 'react';
import {StyleSheet, View, Text, TouchableOpacity, TextInput} from 'react-native';

export default class LookupPatientAccessCode extends Component {
    render() {
        return(
            <View style={styles.container}>
                {/* Dr. Roa has his own patient ID database. 
                We use Dr. Roa patient ID so both of our database matches. */}
                <Text style={styles.text}>Patient ID</Text>
                <TextInput style = {styles.input} />
                <Text style={styles.text}>First Name</Text>
                <TextInput style = {styles.input} />
                <Text style={styles.text}>Last Name</Text>
                <TextInput style = {styles.input} />
                <TouchableOpacity style={styles.buttonContainer} 
                    onPress={() => this.props.navigation.navigate('ShowAccessCode')}>
                    <Text  style={styles.buttonText}>Look up Access Code</Text>
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