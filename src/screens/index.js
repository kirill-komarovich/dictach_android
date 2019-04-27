import { Navigation } from 'react-native-navigation';
import Initializing from './Initializing';
import SignIn from './SignIn';
import Dictionaries from './Dictionaries';
import Dictionary from './Dictionary';

export function registerScreens(store, Provider) {
  Navigation.registerComponentWithRedux(
    'dictach.navigation.dictionary',
    () => Dictionary,
    Provider,
    store,
  );
  Navigation.registerComponentWithRedux(
    'dictach.navigation.dictionaries',
    () => Dictionaries,
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
