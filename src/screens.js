import { Navigation } from 'react-native-navigation';
import Home from './Home';
import Initializing from './Initializing';
import SignIn from './SignIn';

export function registerScreens() {
  Navigation.registerComponent('dictach.navigation.home', () => Home);
  Navigation.registerComponent('dictach.navigation.initializing', () => Initializing);
  Navigation.registerComponent('dictach.navigation.signIn', () => SignIn);
}
