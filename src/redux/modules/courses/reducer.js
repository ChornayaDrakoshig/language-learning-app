import {courseConstants} from './actionConstants.js';
const serverAdress = 'http://localhost:4000/';
/*
new Audio("http://localhost:4000/1.mp3"),

из полученной инфы замапить нужную
*/

const initialState = {
  allCoursesList: [],
  currentCourse: [],
  currentModule: [],
};

export function courses(state = initialState, action) {
  switch (action.type) {
    case courseConstants.GET_ALL:
      return handleGetAllCourses(state, action);
    case courseConstants.GET_CURRENT:
      return {
        ...state,
        currentCourse: action.modules,
      };
    case courseConstants.GET_INFO:
      return handleGetModule(state, action);
    
    default: return state;
  }
}

const handleGetAllCourses = (state, data) => {
  const newCourses = data.languages.map((item) => {
    const language = item;
    const started = data.onLearning.filter(item => {return (item.language_id === language.id)});

    return {
      ...language,
      imageSrc: `${serverAdress}languages/${item.id}.jpg`,
      onLearning: (started.length > 0),
    }
  });

  return { ...state, allCoursesList: newCourses };
};


const handleGetModule = (state, data) => {
  // TODO: add onlearning
  let newModule = data.content.map(item => {
    return {
      ...item,
      audioSrc: `${serverAdress}audio/${item.id}.mp3`,
      imageSrc: `${serverAdress}content/${item.imageId}.jpg`,
    }
  });

  return { ...state, currentModule: newModule };
};

export default courses;
