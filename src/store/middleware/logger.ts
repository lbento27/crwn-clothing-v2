//creating our middleware, see curring

import { Middleware } from 'redux';

import { RootState } from './../store';

// eslint-disable-next-line @typescript-eslint/ban-types
export const loggerMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log('type: ', action.type);
  console.log('payload: ', action.payload);
  console.log('currentState: ', store.getState());

  next(action);

  console.log('nextState: ', store.getState());
};
