import { urls, methods, headers } from './apiUrls';

class DictionariesApi {
  async fetchAll(page, rowsPerPage, order, direction) {
    const request = new Request(urls.dictionaries(page, rowsPerPage, order, direction), {
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

  async fetch(id) {
    const request = new Request(urls.dictionary(id), {
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

  async create({ title, language }) {
    const request = new Request(urls.dictionaries(), {
      method: methods.post,
      credentials: 'include',
      headers: new Headers({
        ...headers.contentType.json,
      }),
      body: JSON.stringify({
        dictionary: {
          title,
          language,
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

  async destroy(id) {
    const request = new Request(urls.dictionary(id), {
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

export default DictionariesApi;
