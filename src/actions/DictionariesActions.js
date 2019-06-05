import * as types from '@src/actionTypes/dictionaries';
import DictionariesApi from '@src/api/DictionariesApi';

export function fetchAllDictionaries(page, rowsPerPage, order, direction) {
  const dictionariesApi = new DictionariesApi();
  return async function(dispatch) {
    dispatch({ type: types.FETCH_ALL_DICTIONARIES_BEGIN });
    const response = await dictionariesApi.fetchAll(page, rowsPerPage, order, direction);
    if (!response.errors) {
      dispatch({
        type: types.FETCH_ALL_DICTIONARIES_SUCCESS,
        dictionaries: response.dictionaries,
        pages: response.meta.pages,
        records: response.meta.records,
      });
    } else {
      dispatch({ type: types.FETCH_ALL_DICTIONARIES_FAILURE });
    }
  };
}

export function refreshAllDictionaries(page, rowsPerPage, order, direction) {
  const dictionariesApi = new DictionariesApi();
  return async function(dispatch) {
    dispatch({ type: types.REFRESH_ALL_DICTIONARIES_BEGIN });
    const response = await dictionariesApi.fetchAll(page, rowsPerPage, order, direction);
    if (!response.errors) {
      dispatch({
        type: types.REFRESH_ALL_DICTIONARIES_SUCCESS,
        dictionaries: response.dictionaries,
        pages: response.meta.pages,
        records: response.meta.records,
      });
    } else {
      dispatch({ type: types.REFRESH_ALL_DICTIONARIES_FAILURE });
    }
  };
}

export function fetchDictionary(id) {
  const dictionariesApi = new DictionariesApi();
  return async function(dispatch) {
    dispatch({ type: types.FETCH_DICTIONARY_BEGIN });
    const response = await dictionariesApi.fetch(id);
    if (!response.errors) {
      dispatch({
        type: types.FETCH_DICTIONARY_SUCCESS,
        dictionary: response,
      });
    } else {
      dispatch({ type: types.FETCH_DICTIONARY_FAILURE });
    }
  };
}

export function createDictionary(dictionary) {
  const dictionariesApi = new DictionariesApi();
  return async function(dispatch) {
    dispatch({ type: types.CREATE_DICTIONARY_BEGIN });
    const response = await dictionariesApi.create(dictionary);
    if (!response.errors) {
      dispatch({ type: types.CREATE_DICTIONARY_SUCCESS });
    } else {
      dispatch({ type: types.CREATE_DICTIONARY_FAILURE });
    }
  };
}

export function updateDictionary(id, dictionary) {
  const dictionariesApi = new DictionariesApi();
  return async function(dispatch) {
    dispatch({ type: types.UPDATE_DICTIONARY_BEGIN });
    const response = await dictionariesApi.update(id, dictionary);
    if (!response.errors) {
      dispatch({ type: types.UPDATE_DICTIONARY_SUCCESS, dictionary: response });
    } else {
      dispatch({ type: types.UPDATE_DICTIONARY_FAILURE });
    }
  };
}


export function destroyDictionary(id) {
  const dictionariesApi = new DictionariesApi();
  return async function(dispatch) {
    dispatch({ type: types.DESTROY_DICTIONARY_BEGIN });
    const response = await dictionariesApi.destroy(id);
    if (!response.errors) {
      dispatch({
        type: types.DESTROY_DICTIONARY_SUCCESS,
        dictionary: response,
      });
    } else {
      dispatch({ type: types.DESTROY_DICTIONARY_FAILURE });
    }
  };
}
