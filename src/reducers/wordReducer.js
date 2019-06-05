import * as types from '../actionTypes/words';
import initialState from './initialState';

function wordReducer(state = initialState.word, action) {
  switch(action.type) {
  case types.CREATE_WORD_BEGIN:
  case types.FETCH_WORD_BEGIN:
  case types.UPDATE_WORD_BEGIN:
    return {
      ...state,
      errors: false,
      loading: true,
    };
  case types.CREATE_WORD_SUCCESS:
    return {
      ...state,
      loading: false,
    };
  case types.FETCH_WORD_SUCCESS:
  case types.UPDATE_WORD_SUCCESS:
    return {
      ...state,
      ...action.word,
      loading: false,
    };
  case types.FETCH_WORD_FAILURE:
  case types.CREATE_WORD_FAILURE:
  case types.UPDATE_WORD_FAILURE:
    return {
      ...state,
      errors: true,
      loading: false,
    };
  default:
    return state;
  }
}

export default wordReducer;
