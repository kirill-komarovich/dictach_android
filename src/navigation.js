import { Navigation } from 'react-native-navigation';
import { topBarColor, statusBarColor } from '@src/colors';
import { displayName as appName } from '../app.json';

const topBar = {
  title: {
    text: appName,
    color: 'white',
  },
  background: {
    color: topBarColor,
  },
  backButton: {
    color: 'white',
  },
  elevation: 0,
};

const statusBar = {
  backgroundColor: statusBarColor,
  style: 'dark',
};

const layout = {
  orientation: ['portrait'],
};

export function startApp() {
  Navigation.setDefaultOptions({
    topBar,
    statusBar,
    layout,
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

export function startDictionariesApp() {
  Navigation.setRoot({
    root: {
      sideMenu: {
        left: {
          component: {
            name: 'dictach.navigation.sideMenu',
            passProps: {
              optionTitles:
              [
                {
                  id: 1,
                  title: 'OPTION1'
                },
                {
                  id: 2,
                  title: 'OPTION2',
                },
                {
                  id: 3,
                  title: 'OPTION3',
                },
              ]
            }
          }
        },
        center: {
          stack: {
            id: 'application',
            children: [
              {
                component: {
                  name: 'dictach.navigation.dictionaries',
                },
              },
            ],
          }
        },
      }
    }
  });
}

export const openModal = (name, options = {}, props = {}) => {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            name,
            passProps: props,
            options,
          },
        },
      ],
    },
  });
}
