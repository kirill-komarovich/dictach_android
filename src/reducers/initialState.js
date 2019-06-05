export default {
  dictionaries: {
    all: [],
    pages: 0,
    records: 0,
    loading: false,
  },
  dictionary: {
    id: 0,
    title: '',
    language: '',
    alphabeth: [],
    tags: [],
    created_at: '',
    updated_at: '',
    loading: false,
    errors: false,
  },
  session: {
    errors: null,
    loading: false,
    authenticated: false,
  },
  words: {
    loading: false,
    errors: null,
  },
  word: {
    id: 0,
    title: '',
    loading: false,
    errors: false,
  },
}
