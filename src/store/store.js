import { compose, createStore, applyMiddleware } from 'redux';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; //in web browser will use local storage

//import logger from 'redux-logger';

import { rootReducer } from './root-reducer';
//creating our middleware, see curring

const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log('type: ', action.type);
  console.log('payload: ', action.payload);
  console.log('currentState: ', store.getState());

  next(action);

  console.log('nextState: ', store.getState());
};

//persist config  root=persist all
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user'], //don't want to persist user reducer
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
//end persist

//logger
//middleware its a func that when we dispatch a action before the action hit the reducers, hits the middleware first
const middleware = [loggerMiddleware];
const composedEnhancers = compose(applyMiddleware(...middleware));

//root-reducer

export const store = createStore(persistedReducer, undefined, composedEnhancers); //undefine because the second argument its for additional default states

export const persistor = persistStore(store);
