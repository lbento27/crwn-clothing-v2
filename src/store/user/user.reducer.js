import { USER_ACTION_TYPES } from './user.types';

//initial object
const INITIAL_STATE = {
  currentUser: null,
};
//Reducer function
export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      return state; //this tells that the action doesn't affect this reducer, object doesn't change, no reducer update no rerender this component
  }
};
