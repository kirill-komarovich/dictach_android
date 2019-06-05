import * as types from '@src/actionTypes/words';
import WordsApi from '@src/api/WordsApi';

export function fetchAllWordsByLetter(dictionaryId, letter) {
  const wordsApi = new WordsApi();
  return async function(dispatch) {
    dispatch({ type: types.FETCH_ALL_BY_LETTER_BEGIN });
    const response = await wordsApi.fetchAllByLetter(dictionaryId, letter);
    if (!response.errors) {
      dispatch({
        type: types.FETCH_ALL_BY_LETTER_SUCCESS,
        letter,
        words: response,
      });
    } else {
      dispatch({ type: types.FETCH_ALL_BY_LETTER_FAILURE });
    }
  };
}

export function createWord(dictionaryId, word) {
  const wordsApi = new WordsApi();
  return async function(dispatch) {
    dispatch({ type: types.CREATE_WORD_BEGIN });
    const response = await wordsApi.create(dictionaryId, word);
    if (!response.errors) {
      dispatch({
        type: types.CREATE_WORD_SUCCESS,
        word: response,
      });
    } else {
      dispatch({ type: types.CREATE_WORD_FAILURE });
    }
  };
}

export function fetchWord(dictionaryId, id) {
  const wordsApi = new WordsApi();
  return async function(dispatch) {
    dispatch({ type: types.FETCH_WORD_BEGIN });
    const response = await wordsApi.fetch(dictionaryId, id);
    if (!response.errors) {
      dispatch({
        type: types.FETCH_WORD_SUCCESS,
        word: response,
      });
    } else {
      dispatch({ type: types.FETCH_WORD_FAILURE });
    }
  };
}

export function updateWord(dictionaryId, word) {
  const wordsApi = new WordsApi();
  return async function(dispatch) {
    dispatch({ type: types.UPDATE_WORD_BEGIN });
    const response = await wordsApi.update(dictionaryId, word);
    if (!response.errors) {
      dispatch({ type: types.UPDATE_WORD_SUCCESS, word: response });
    } else {
      dispatch({ type: types.UPDATE_WORD_FAILURE });
    }
  };
}
