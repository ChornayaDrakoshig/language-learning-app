import {appConstants} from './actionConstants.js';

const initialState = {
  isLoading: false,
  alert: '',
  currentCourse: 0,
};
// TODO по умолчанию ноль,  как-то сохранять и получать при загрузке последний курс
// а так обновляется по ходу

export function app(state = initialState, action) {
  switch (action.type) {
    case appConstants.WAIT:
      return {
        ...state,
        isLoading: true,
        alert: '',
      };
    case appConstants.SUCCESS:
      return {
        ...state,
        isLoading: false,
        alert: '',
      };
    case appConstants.ERROR:
      return {
        ...state,
        isLoading: false,
        alert: action.message,
      };
    case appConstants.SET_COURSE:
      return {
        ...state,
        currentCourse: action.languageId,
      }
    default: return state;
  }
}
export default app;