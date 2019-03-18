const urls = {
  session: {
    signin: 'api/users/sign_in',
    signup: 'api/users/sign_up',
    signout: 'api/users/sign_out',
    check: 'api/authentication_checks',
  },

  tags: () => 'api/tags',
  tag: (id) => `api/tags/${id}`,

  dictionaries(page, rowsPerPage, order, direction) {
    const url = 'api/dictionaries';
    return this.withQueryParams(url, { page, per_page: rowsPerPage, order, direction });
  },
  dictionary(id) {
    return `${this.dictionaries}/${id}`;
  },

  words(dictionary_id, letter) {
    const url = `${this.dictionary(dictionary_id)}/words`;
    if (letter === undefined) {
      return url;
    }
    return this.withQueryParams(url, { letter })
  },
  word(dictionary_id, id) {
    return `${this.dictionary(dictionary_id)}/word/${id}`
  },

  withQueryParams(originUrl, params) {
    let url = originUrl.concat('?');
    Object.keys(params).forEach((param) => {
      if (params[param]){
        url = url.concat(`${param}=${params[param]}&`);
      }
    });
    return url.slice(0, -1);
  }
};


const methods = {
  get: 'GET',
  post: 'POST',
  delete: 'DELETE',
  put: 'PUT',
};

const headers = {
  contentType: {
    json: {
      'Content-Type': 'application/json',
    },
  },
  accept: {
    json: {
      'Accept': 'application/json',
    },
  },
};

const domain = 'https://dictach.herokuapp.com/';

export {
  urls,
  methods,
  headers,
  domain,
};
