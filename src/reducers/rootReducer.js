import { combineReducers } from 'redux';
import dictionaries from './dictionariesReducer';
import dictionary from './dictionaryReducer';
import session from './sessionReducer';

const rootReducer = combineReducers({
  dictionaries,
  dictionary,
  session,
});

export default rootReducer;
