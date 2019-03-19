import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import persistedReducer from '@src/reducers/persistedReducer';

const middlewares = [thunkMiddleware];
if (process.env.NODE_ENV === 'development') {
  middlewares.push(loggerMiddleware)
}
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

const store = createStoreWithMiddleware(persistedReducer);

export {
  store,
};
