import {appConstants} from './actionConstants.js';

const initialState = {
  isLoading: false,
  alert: {},
  currentCourse: 1,
};
// TODO по умолчанию ноль,  как-то сохранять и получать при загрузке последний курс
// а так обновляется по ходу

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