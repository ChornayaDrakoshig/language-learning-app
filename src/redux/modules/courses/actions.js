import {courseConstants} from './actionConstants.js';
import { wait, success, error } from 'redux/modules/app/actions.js';
const superagent = require('superagent');

export const getAllCoursesList = (userId) => {
  return dispatch => {
    dispatch(wait());
    superagent
      .get('http://localhost:4000/courses')
      .set('Accept', 'application/json')
      .query({ userId })
      .send()
      .end((err, res) => {
        if (err) {
          dispatch(error('ошибка получения данных о курсах'));
        } else {
          const answer = JSON.parse(res.text);

          dispatch(getAllCoursesSuccess(answer));
          dispatch(success());
        }
      });
  };
};

export const getAllCoursesSuccess = (data) => ({
  type: courseConstants.GET_ALL,
  languages: data.languages,
  onLearning: data.onLearning,
});

export const getCurrentCourse = (userId, languageId) => {
  return dispatch => {
    dispatch(wait());
    superagent
      .get('http://localhost:4000/learning_modules')
      .set('Accept', 'application/json')
      .query({ userId, languageId })
      .send()
      .end((err, res) => {
        if (err) {
          dispatch(error('ошибка получения данных о mmodule'));
        } else {
          const answer = JSON.parse(res.text);

          dispatch(getCurrentCourseSuccess(answer));
          dispatch(success());
        }
      });
  };
};

export const getCurrentCourseSuccess = (data) => ({
  type: courseConstants.GET_CURRENT,
  modules: data.modules,
  tags: data.tags,
  onLearning: data.onLearning,
});


export const getCurrentModule = (userId, moduleId) => {
  return dispatch => {
    dispatch(wait());
    superagent
      .get('http://localhost:4000/module_content')
      .set('Accept', 'application/json')
      .query({ userId, moduleId })
      .send()
      .end((err, res) => {
        if (err) {
          dispatch(error('ошибка получения данных'));
        } else {
          const answer = JSON.parse(res.text);

          dispatch(getCurrentModuleSuccess(answer));
          dispatch(success());
        }
      });
  };
};

export const getCurrentModuleSuccess = (data) => ({
  type: courseConstants.GET_INFO,
  content: data.content,
  onLearning: data.onLearning,
});


