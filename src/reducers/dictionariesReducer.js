import * as types from '@src/actionTypes/dictionaries';
import initialState from './initialState';

function dictionariesReducer(state = initialState.dictionaries, action) {
  switch(action.type) {
  case types.FETCH_ALL_DICTIONARIES_BEGIN:
  case types.REFRESH_ALL_DICTIONARIES_BEGIN:
    return {
      ...state,
      loading: true,
    };
  case types.REFRESH_ALL_DICTIONARIES_SUCCESS:
    return {
      ...state,
      all: action.dictionaries,
      pages: action.pages,
      records: action.records,
      loading: false,
    };
  case types.FETCH_ALL_DICTIONARIES_SUCCESS:
    return {
      ...state,
      all: [...state.all, ...action.dictionaries],
      pages: action.pages,
      records: action.records,
      loading: false,
    };
  case types.FETCH_ALL_DICTIONARIES_FAILURE:
  case types.REFRESH_ALL_DICTIONARIES_FAILURE:
    return {
      ...state,
      loading: false,
    };
  default:
    return state;
  }
}

export default dictionariesReducer;
