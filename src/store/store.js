import { compose, createStore, applyMiddleware } from 'redux';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; //in web browser will use local storage

import logger from 'redux-logger';
//import { loggerMiddleware } from './middleware/logger';

import { rootReducer } from './root-reducer';

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
const middleware = [process.env.NODE_ENV !== 'production' && logger].filter(Boolean); //.filter(Boolean) this makes that if the statement is false will get remove, ex [false] goes to empty [] if true will keep obj logger [logger]

//to use with redux devtools extension in chrome
const composedEnhancer =
  (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
//if devtools extension present use it if not use regular compose from redux

//const composedEnhancers = compose(applyMiddleware(...middleware));
const composedEnhancers = composedEnhancer(applyMiddleware(...middleware));

//root-reducer

export const store = createStore(persistedReducer, undefined, composedEnhancers); //undefine because the second argument its for additional default states

export const persistor = persistStore(store);
