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

import HomeScreen from './views/HomeScreen';
import StaffLogin from './views/StaffLogin';

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  StaffLogin: {screen : StaffLogin},
});

const App = createAppContainer(MainNavigator);

export default App;