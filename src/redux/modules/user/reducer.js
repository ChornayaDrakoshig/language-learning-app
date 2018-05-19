import {userConstants} from './actionConstants.js';

const initialState = {};

export function user(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN:
      return action.user;
    case userConstants.LOGOUT: return {};
    case userConstants.GET_LEARNING_PATTERNS:
      return {...state, learningPatterns: {...state.learningPatterns, ...action.pattern}}

    default: return state;
  }
}
export default alert;