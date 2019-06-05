import { combineReducers } from 'redux';
import dictionaries from './dictionariesReducer';
import dictionary from './dictionaryReducer';
import session from './sessionReducer';
import words from './wordsReducer';

const rootReducer = combineReducers({
  dictionaries,
  dictionary,
  session,
  words,
});

export default rootReducer;
