import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider as PaperProvider } from 'react-native-paper';
import Initializing from './Initializing';
import SignIn from './SignIn';
import Dictionaries from './Dictionaries';
import Dictionary from './Dictionary';
import DictionaryForm from './DictionaryForm';
import WordForm from './WordForm';
import SideMenu from './SideMenu';

const withProviders = (Provider, store) => Component => {
  const ComponentWithPropviders = props => (
    <Provider store={store}>
      <PaperProvider>
        <Component {...props} />
      </PaperProvider>
    </Provider>
  );
  ComponentWithPropviders.displayName = `${Component.name}WithProviders`;

  return ComponentWithPropviders;
}

export function registerScreens(store, Provider) {
  Navigation.registerComponent(
    'dictach.navigation.dictionary',
    () => withProviders(Provider, store)(Dictionary),
    () => Dictionary,
  );
  Navigation.registerComponent(
    'dictach.navigation.dictionaries',
    () => withProviders(Provider, store)(Dictionaries),
    () => Dictionaries,
  );
  Navigation.registerComponent(
    'dictach.modal.dictionaryForm',
    () => withProviders(Provider, store)(DictionaryForm),
    () => DictionaryForm,
  );
  Navigation.registerComponent(
    'dictach.modal.wordForm',
    () => withProviders(Provider, store)(WordForm),
    () => WordForm,
  );
  Navigation.registerComponent(
    'dictach.navigation.initializing',
    () => withProviders(Provider, store)(Initializing),
    () => Initializing,
  );
  Navigation.registerComponent(
    'dictach.navigation.sideMenu',
    () => withProviders(Provider, store)(SideMenu),
    () => SideMenu,
  );
  Navigation.registerComponent(
    'dictach.navigation.signIn',
    () => withProviders(Provider, store)(SignIn),
    () => SignIn,
  );
}
