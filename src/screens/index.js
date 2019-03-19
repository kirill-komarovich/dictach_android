import { Navigation } from 'react-native-navigation';
import Home from './Home';
import Initializing from './Initializing';
import SignIn from './SignIn';

export function registerScreens(store, Provider) {
  Navigation.registerComponentWithRedux(
    'dictach.navigation.home',
    () => Home,
    Provider,
    store,
  );
  Navigation.registerComponentWithRedux(
    'dictach.navigation.initializing',
    () => Initializing,
    Provider,
    store,
  );
  Navigation.registerComponentWithRedux(
    'dictach.navigation.signIn',
    () => SignIn,
    Provider,
    store,
  );
}
