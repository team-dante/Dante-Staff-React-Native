/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  createSwitchNavigator,
  createAppContainer,
  NavigationActions,
} from 'react-navigation';
import Config from 'react-native-config'
import firebase from 'firebase';

import HomeScreen from './src/screens/homeScreen';
import StaffLogin from './src/screens/staffLoginScreen';
import StaffWelcome from './src/screens/staffWelcomeScreen';
import GeneratePatientAccessCode from './src/screens/generatePatientAcessCode';
import LookupPatientAccessCode from './src/screens/lookupPatientAccessCode';
import ShowAccessCode from './src/screens/showAcessCode';
import PatientLogin from './src/screens/patientLogin';
import PatientWelcome from './src/screens/patientWelcome';

const AppNavigator = createSwitchNavigator(
  {
    HomeScreen,
    StaffLogin,
    PatientLogin,
    StaffWelcome,
    PatientWelcome,
    GeneratePatientAccessCode,
    LookupPatientAccessCode,
    ShowAccessCode,
  },
  {
    initialRouteName: 'HomeScreen'
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {

  componentDidMount() {
    let config = {
      apiKey: Config.API_KEY,
      authDomain: Config.AUTH_DOMAIN,
      databaseURL: Config.DATABASE_URL,
      projectId: Config.PROJECT_ID,
      storageBucket: Config.STORAGE_BUCKET,
      messagingSenderId: Config.MESSAGING_SENDER
    };
    console.log(config);
    firebase.initializeApp(config);
  }

  render() {
    return <AppContainer />;
  }
}