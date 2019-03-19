/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import { Navigation } from "react-native-navigation";
import { Provider } from 'react-redux';
import { store } from './src/store';
import { persistStore } from 'redux-persist';
import { registerScreens } from './src/screens';
import { startApp } from './src/navigation';

Navigation.events().registerAppLaunchedListener(() => {
  persistStore(store, null, () => {
    registerScreens(store, Provider);
    startApp();
  })
});
