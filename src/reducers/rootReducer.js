import { combineReducers } from 'redux';
import dictionaries from './dictionariesReducer';
import dictionary from './dictionaryReducer';
import session from './sessionReducer';
import words from './wordsReducer';
import word from './wordReducer';

const rootReducer = combineReducers({
  dictionaries,
  dictionary,
  session,
  words,
  word,
});

export default rootReducer;
