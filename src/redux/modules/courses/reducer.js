import {courseConstants} from './actionConstants.js';

const initialState = {
  allCoursesList: [],
  currentCourse: {},
  currentModule: {},
};

export function courses(state = initialState, action) {
  switch (action.type) {
    case courseConstants.GET_ALL:
      return {
        ...state,
        allCoursesList: action.list,
      };
    case courseConstants.GET_CURRENT:
      return {
        ...state,
        currentCourse: action.course
      };
    case courseConstants.GET_INFO:
      return {
        ...state,
        currentModule: action.module,
      };
    default: return state;
  }
}

export default courses;
