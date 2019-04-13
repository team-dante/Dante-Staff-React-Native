import React, { Component } from 'react';
import { View, StyleSheet} from 'react-native';
import CustomizedButton from "../components/button";

export default class StaffLogin extends React.Component {
    render() {
        console.log("????");
        return (
            <View style={styles.container}>
                <CustomizedButton label={"Login"} onPress={() => {}}/>                  
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    }
});