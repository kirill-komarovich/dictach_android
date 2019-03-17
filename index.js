/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import { Navigation } from "react-native-navigation";
import { registerScreens } from './src/screens';
import { startApp } from './src/navigation';


registerScreens();

Navigation.events().registerAppLaunchedListener(startApp);
