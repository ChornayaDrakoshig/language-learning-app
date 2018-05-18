import {courseConstants} from './actionConstants.js';
const serverAdress = 'http://localhost:4000/';
/*
new Audio("http://localhost:4000/1.mp3"),

из полученной инфы замапить нужную
*/

const initialState = {
  allCoursesList: [],
  currentCourse: [],
  tagsList: [],
  currentModule: [],
  revisionModules: [],
};

export function courses(state = initialState, action) {
  switch (action.type) {
    case courseConstants.GET_ALL:
      return handleGetAllCourses(state, action);
    case courseConstants.GET_CURRENT:
      return handleGetGurrentCourse(state, action);
    case courseConstants.GET_INFO:
      return handleGetModule(state, action);
    //case courseConstants.UPDATE_MODULE:
    //  return handleUpdateModule(state, action);
    case courseConstants.REVISION:
      return handleGetRevisionModules(state, action);

    default: return state;
  }
}

const handleGetAllCourses = (state, data) => {
  const newCourses = data.languages.map((language) => {
    const onLearning = data.onLearning.filter(item => {return (item.language_id === language.id)});

    return {
      ...language,
      imageSrc: `${serverAdress}languages/${language.id}.jpg`,
      onLearning: (onLearning.length > 0),
    }
  });

  return {
    ...state,
    allCoursesList: newCourses,
    currentCourse: [],
  };
};

const handleGetGurrentCourse = (state, data) => {
  const course = data.modules.map(module => {
    const onLearning = data.onLearning.filter(item => {return (item.module_id === module.id)});

    return {
      ...module,
      onLearning: (onLearning.length > 0),
    }
  });
  
  return {
    ...state,
    currentCourse: course,
    tagsList: data.tags,
    revisionModules: [],
    currentModule: [],
  };
}

const handleGetModule = (state, data) => {
  let newModule = data.content.map(item => {
    return {
      ...item,
      audioSrc: `${serverAdress}audio/${item.id}.mp3`,
      imageSrc: `${serverAdress}content/${item.imageId}.jpg`,
    }
  });

  return { ...state, currentModule: newModule};
};

export default courses;

const handleGetRevisionModules = (state, data) => {
  return {...state, revisionModules: data.modules}
}