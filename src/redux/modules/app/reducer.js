import {appConstants} from './actionConstants.js';

const initialState = {
  isLoading: false,
  alert: '',
  currentCourse: 0,
  filters: {
    searchRow: '',
    tag: 0,
    showOnLearning: true,
    showNew: true,
  },
};

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
    case appConstants.SET_FILTER_SEARCH_TEXT:
      return {
        ...state,
        filters: {
          ...state.filters,
          searchRow: action.searchText,
        }
      }
    case appConstants.SET_FILTER_TAG:
      return {
        ...state,
        filters: {
          ...state.filters,
          tag: action.searchTag,
        }
      }
    case appConstants.SET_FILTER_LEARNING:
      return {
        ...state,
        filters: {
          ...state.filters,
          showOnLearning: action.onLearningToggle,
        }
      }
    case appConstants.SET_FILTER_NEW:
      return {
        ...state,
        filters: {
          ...state.filters,
          showNew: action.newToggle,
        }
      }

    default: return state;
  }
}
export default app;