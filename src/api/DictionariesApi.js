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
}

export default DictionariesApi;
