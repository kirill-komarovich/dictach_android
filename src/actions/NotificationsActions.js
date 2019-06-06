import * as types from '@src/actionTypes/notifications';

export function showErrors(errors = []) {
  return async function(dispatch) {
    dispatch({ type: types.OPEN_BANNER, errors });
  };
}

export function closeBanner() {
  return async function(dispatch) {
    dispatch({ type: types.CLOSE_BANNER });
  };
}
