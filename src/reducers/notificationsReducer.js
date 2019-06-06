import initialState from './initialState';
import * as types from '@src/actionTypes/notifications';

function NotificationsReducer(state = initialState.notifications, action) {
  switch (action.type) {
  case types.OPEN_BANNER:
    return [
      ...state,
      ...action.errors,
    ];
  case types.CLOSE_BANNER:
    return [];
  default:
    return state;
  }
}

export default NotificationsReducer;
