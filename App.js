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
import GeneratePatientAccount from './src/screens/generatePatientAccount';
import LookupPatientAccount from './src/screens/lookupPatientAccount';
import ShowPatientAccount from './src/screens/showPatientAccount';

const AppNavigator = createSwitchNavigator(
  {
    HomeScreen,
    StaffLogin,
    StaffWelcome,
    GeneratePatientAccount,
    LookupPatientAccount,
    ShowPatientAccount,
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

    console.log("exit componentDidMount");
  }

  render() {
    return <AppContainer />;
  }
}