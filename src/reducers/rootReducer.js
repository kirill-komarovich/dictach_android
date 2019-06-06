import { combineReducers } from 'redux';
import dictionaries from './dictionariesReducer';
import dictionary from './dictionaryReducer';
import session from './sessionReducer';
import words from './wordsReducer';
import word from './wordReducer';
import notifications from './notificationsReducer';

const rootReducer = combineReducers({
  dictionaries,
  dictionary,
  session,
  words,
  word,
  notifications,
});

export default rootReducer;
