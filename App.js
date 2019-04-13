/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

import HomeScreen from './src/screens/homeScreen';
import StaffLogin from './src/screens/staffLoginScreen';
import StaffWelcome from './src/screens/staffWelcomeScreen';

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  StaffLogin: {screen : StaffLogin},
  StaffWelcome: {screen : StaffWelcome}
});

const App = createAppContainer(MainNavigator);

export default App;