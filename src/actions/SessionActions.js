import * as types from '@src/actionTypes/session';
import SessionApi from '@src/api/SessionApi';
import { showErrors, closeBanner } from './NotificationsActions';

export function signInUser(credentials) {
  const sessionApi = new SessionApi();
  return async function(dispatch) {
    dispatch({ type: types.SIGN_IN_BEGIN });
    dispatch(closeBanner())
    const response = await sessionApi.signin(credentials)
    if (!response.errors) {
      dispatch({ type: types.SIGN_IN_SUCCESS });
    } else {
      dispatch({ type: types.SIGN_IN_FAILURE });
      dispatch(showErrors(response.errors));
    }
  };
}

export function signOutUser() {
  const sessionApi = new SessionApi();
  return async function(dispatch) {
    dispatch({ type: types.SIGN_OUT_BEGIN });
    dispatch(closeBanner())
    const response = await sessionApi.signout();
    if (!response.errors) {
      dispatch({ type: types.SIGN_OUT_SUCCESS });
    } else {
      dispatch({ type: types.SIGN_OUT_FAILURE });
      dispatch(showErrors(response.errors));
    }
  };
}

export function checkAuthentication() {
  const sessionApi = new SessionApi();
  return async function(dispatch) {
    dispatch({ type: types.AUTHENTICATION_CHECK_BEGIN });
    const response = await sessionApi.checkAuthentication();
    const status = response.ok;
    dispatch({ type: types.AUTHENTICATION_CHECK_END, status });
  };
}
