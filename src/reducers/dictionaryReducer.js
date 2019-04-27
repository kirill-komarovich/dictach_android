import * as types from '@src/actionTypes/dictionaries';
import initialState from './initialState';

function dictionaryReducer(state = initialState.dictionary, action) {
  switch(action.type) {
  case types.FETCH_DICTIONARY_BEGIN:
  case types.CREATE_DICTIONARY_BEGIN:
    return {
      ...state,
      errors: false,
      loading: true,
    };
  case types.FETCH_DICTIONARY_SUCCESS:
  case types.CREATE_DICTIONARY_SUCCESS:
    return {
      ...state,
      ...action.dictionary,
      loading: false,
    };
  case types.FETCH_DICTIONARY_FAILURE:
  case types.CREATE_DICTIONARY_FAILURE:
    return {
      ...state,
      errors: true,
      loading: false,
    };
  default:
    return state;
  }
}

export default dictionaryReducer;
