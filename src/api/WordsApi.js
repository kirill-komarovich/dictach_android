import { urls, methods, headers } from './apiUrls';

class WordsApi {
  async fetchAllByLetter(dictionaryId, letter) {
    const request = new Request(urls.words(dictionaryId, letter), {
      method: methods.get,
      credentials: 'include',
      headers: new Headers({
        ...headers.accept.json,
      }),
    });

    try {
      const response = await fetch(request);
      return response.json();
    }

    catch (error) {
      return error;
    }
  }

  async create(dictionaryId, { title, descriptions_attributes }) {
    const request = new Request(urls.words(dictionaryId), {
      method: methods.post,
      credentials: 'include',
      headers: new Headers({
        ...headers.contentType.json,
      }),
      body: JSON.stringify({
        word: {
          title,
          descriptions_attributes,
        }
      }),
    });

    try {
      const response = await fetch(request);
      return response.json();
    }

    catch (error) {
      return error;
    }
  }

  async fetch(dictionaryId, id) {
    const request = new Request(urls.word(dictionaryId, id), {
      method: methods.get,
      credentials: 'include',
      headers: new Headers({
        ...headers.accept.json,
      }),
    });

    try {
      const response = await fetch(request);
      return response.json();
    }

    catch (error) {
      return error;
    }
  }

  async update(dictionaryId, { id, title, descriptions_attributes }) {
    const request = new Request(urls.word(dictionaryId, id), {
      method: methods.put,
      credentials: 'include',
      headers: new Headers({
        ...headers.contentType.json,
      }),
      body: JSON.stringify({
        word: {
          title,
          descriptions_attributes,
        }
      }),
    });

    try {
      const response = await fetch(request);
      return response.json();
    }

    catch (error) {
      return error;
    }
  }

  async destroy(dictionaryId, id ) {
    const request = new Request(urls.word(dictionaryId, id), {
      method: methods.delete,
      credentials: 'include',
      headers: new Headers({
        ...headers.accept.json,
      }),
    });

    try {
      const response = await fetch(request);
      return response.json();
    }

    catch (error) {
      return error;
    }
  }
}

export default WordsApi;
