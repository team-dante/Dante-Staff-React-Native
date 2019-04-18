/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {
  createStackNavigator,
  createAppContainer,
  NavigationActions,
} from 'react-navigation';

import HomeScreen from './src/screens/homeScreen';
import StaffLogin from './src/screens/staffLoginScreen';
import StaffWelcome from './src/screens/staffWelcomeScreen';
import GeneratePatientAccessCode from './src/screens/generatePatientAcessCode';
import LookupPatientAccessCode from './src/screens/lookupPatientAccessCode';
import ShowAccessCode from './src/screens/showAcessCode';
import PatientLogin from './src/screens/patientLogin';
import PatientWelcome from './src/screens/patientWelcome';

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  StaffLogin: {screen : StaffLogin},
  PatientLogin: {screen : PatientLogin},
  StaffWelcome: {screen : StaffWelcome},
  PatientWelcome: {screen : PatientWelcome},
  GeneratePatientAccessCode: {screen : GeneratePatientAccessCode},
  LookupPatientAccessCode: {screen: LookupPatientAccessCode},
  ShowAccessCode : {screen: ShowAccessCode},
});



const App = createAppContainer(MainNavigator);

export default App;