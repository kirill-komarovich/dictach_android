import { createStore, applyMiddleware } from 'redux';
import persistedReducer from './reducers/persistedReducer';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';

const middlewares = [thunkMiddleware];
if (process.env.NODE_ENV === 'development') {
  middlewares.push(loggerMiddleware)
}
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

const store = createStoreWithMiddleware(persistedReducer);

export {
  store,
};
