import { compose, createStore, applyMiddleware, Middleware } from 'redux';

import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; //in web browser will use local storage

import logger from 'redux-logger'; // yarn add @types/redux-logger
//import { loggerMiddleware } from './middleware/logger';

//import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './root-saga';

import { rootReducer } from './root-reducer';

export type RootState = ReturnType<typeof rootReducer>;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose; //. ?:means that could contain or not
  }
}

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[];
};

//persist config  root=persist all
const persistConfig: ExtendedPersistConfig = {
  key: 'root',
  storage,
  //blacklist: ['user'], //don't want to persist user reducer and now categories because of thunk and spinner so better use whitelist
  whitelist: ['cart'],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);
//end persist

//logger
//middleware its a func that when we dispatch a action before the action hit the reducers, hits the middleware first
const middleware = [process.env.NODE_ENV !== 'production' && logger, sagaMiddleware].filter(
  (middleware): middleware is Middleware => Boolean(middleware),
); //.filter(Boolean) this makes that if the statement is false will get remove, ex [false] goes to empty [] if true will keep obj logger [logger]

//to use with redux devtools extension in chrome
const composedEnhancer =
  (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
//if devtools extension present use it if not use regular compose from redux

//const composedEnhancers = compose(applyMiddleware(...middleware));
const composedEnhancers = composedEnhancer(applyMiddleware(...middleware));

//root-reducer

export const store = createStore(persistedReducer, undefined, composedEnhancers); //undefine because the second argument its for additional default states

sagaMiddleware.run(rootSaga); //needs to run after the createStore

export const persistor = persistStore(store);
