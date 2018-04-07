import {appConstants} from './actionConstants.js';

const initialState = {
  isLoading: false,
  alert: {},
};

export function app(state = initialState, action) {
  switch (action.type) {
    case appConstants.WAIT:
      return {
        isLoading: true,
        alert: {},
      };
    case appConstants.SUCCESS:
      return {
        isLoading: false,
        alert: {},
      };
      case appConstants.ERROR:
      return {
        isLoading: false,
        alert: {
          message: action.message,
        },
      };
    default: return state;
  }
}
export default app;