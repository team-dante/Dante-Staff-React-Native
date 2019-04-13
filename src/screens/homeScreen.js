'use strict';
import React, { Component } from 'react';
import {StyleSheet, View, Text } from 'react-native';
import CustomizedButton from '../components/button';

export default class HomeScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to Dante App!</Text>
                <Text style={styles.instructions}>To get started, please choose approriate role.</Text>
                <CustomizedButton label={"Staff"} onPress={() => this.props.navigation.navigate('StaffLogin')} />
                <CustomizedButton label={"Patient"} onPress={() => {}} />
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
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
