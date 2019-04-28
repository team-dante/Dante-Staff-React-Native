/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';

import Config from 'react-native-config'
import firebase from 'firebase';
import Router from './Router';

// import ShowPatientAccount from './src/screens/showPatientAccount';

export default class App extends Component {

  componentWillMount() {
    let config = {
      apiKey: Config.API_KEY,
      authDomain: Config.AUTH_DOMAIN,
      databaseURL: Config.DATABASE_URL,
      projectId: Config.PROJECT_ID,
      storageBucket: Config.STORAGE_BUCKET,
      messagingSenderId: Config.MESSAGING_SENDER
    };
    firebase.initializeApp(config);
    console.log("exit componentWillMount");
  }

  render() {
    return (
      <Router />
    );
  }
}