import { Navigation } from 'react-native-navigation';
import { topBarColor, statusBarColor } from './colors';
import { displayName as appName } from '../app.json';

const topBar = {
  title: {
    text: appName,
    color: 'white',
  },
  background: {
    color: topBarColor,
  },
};

const statusBar = {
  backgroundColor: statusBarColor,
  style: 'dark',
}

export function startApp() {
  Navigation.setDefaultOptions({
    topBar,
    statusBar,
  });

  Navigation.setRoot({
    root: {
      stack: {
        id: 'loader',
        children: [
          {
            component: {
              name: 'dictach.navigation.initializing',
            },
          },
        ],
      },
    },
  });
}

export function startAuthenticationApp() {
  Navigation.setRoot({
    root: {
      stack: {
        id: 'authentication',
        children: [
          {
            component: {
              name: 'dictach.navigation.signIn',
            },
          },
        ],
      }
    }
  });
}

export const startHomeApp = () => Navigation.setRoot({
  root: {
    stack: {
      id: 'application',
      children: [
        {
          component: {
            name: 'dictach.navigation.home',
          }
        }
      ],
    }
  }
})
