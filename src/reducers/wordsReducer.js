import * as types from '@src/actionTypes/words';
import initialState from './initialState';

function wordsReducer(state = initialState.words, action) {
  switch(action.type) {
  case types.FETCH_ALL_BY_LETTER_BEGIN:
    return {
      ...state,
      errors: false,
      loading: true,
    };
  case types.FETCH_ALL_BY_LETTER_SUCCESS:
    return {
      ...state,
      [action.letter]: action.words,
      loading: false,
    };
  case types.FETCH_ALL_BY_LETTER_FAILURE:
    return {
      ...state,
      errors: true,
      loading: false,
    };
  default:
    return state;
  }
}

export default wordsReducer;
