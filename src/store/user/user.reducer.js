import { USER_ACTION_TYPES } from './user.types';

//initial object
const INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  error: null,
};
//Reducer function
export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: payload,
      };
    case USER_ACTION_TYPES.SIGN_IN_FAILED:
      return {
        ...state,
        error: payload,
      };
    default:
      return state; //this tells that the action doesn't affect this reducer, object doesn't change, no reducer update no rerender this component
  }
};
