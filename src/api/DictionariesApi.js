import { urls, methods, headers, domain } from './apiUrls';

class DictionariesApi {
  async fetchAll(page, rowsPerPage, order, direction) {
    const request = new Request(domain + urls.dictionaries(page, rowsPerPage, order, direction), {
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
