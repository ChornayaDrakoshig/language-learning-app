import {userConstants} from './actionConstants.js';

const initialState = {};

export function user(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN:
      return action.user;
    case userConstants.LOGOUT: return {};
    default: return state;
  }
}
export default alert;