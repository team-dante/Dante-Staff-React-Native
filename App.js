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

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  StaffLogin: {screen : StaffLogin},
});

const App = createAppContainer(MainNavigator);

//
export default App;