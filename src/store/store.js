import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

//logger
//middleware its a func that when we dispatch a action before the action hit the reducers, hits the middleware first
const middleware = [logger];
const composedEnhancers = compose(applyMiddleware(...middleware));

//root-reducer

export const store = createStore(rootReducer, undefined, composedEnhancers); //undefine because the second argument its for additional default states
