import { combineReducers } from 'redux';
import session from './sessionReducer';
import dictionaries from './dictionariesReducer';

const rootReducer = combineReducers({
  session,
  dictionaries,
});

export default rootReducer;
