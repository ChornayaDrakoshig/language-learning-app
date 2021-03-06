import {courseConstants} from './actionConstants.js';
import { wait, success, error } from 'redux/modules/app/actions.js';
import { getLearningPatternSuccess } from 'redux/modules/user/actions.js';
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

export const updateModuleAfterTesting = (userId, moduleId, languageId, resultsByTaskType) => {
  return dispatch => {
    superagent
      .put('http://localhost:4000/upd_module')
      .set('Accept', 'application/json')
      .query({ userId, moduleId, languageId, resultsByTaskType })
      .send()
      .end((err, res) => {
        if (err) {
          dispatch(error('ошибка обновления информации'));
        } else {
          const answer = JSON.parse(res.text);
          dispatch(getLearningPatternSuccess(answer.learningPattern[0]));          
          dispatch(success());
        }
      });
  };
};

export const updateModuleAfterLearning = (userId, moduleId, languageId) => {
  return dispatch => {
    superagent
      .put('http://localhost:4000/upd_module')
      .set('Accept', 'application/json')
      .query({ userId, moduleId, languageId })
      .send()
      .end((err, res) => {
        if (err) {
          dispatch(error('ошибка обновления информации'));
        } else {
          const answer = JSON.parse(res.text);
          dispatch(getLearningPatternSuccess(answer.learningPattern[0]));
          dispatch(success());
        }
      });
  };
  
};

export const getRevisionModule = (userId, languageId) => {  
  return dispatch => {
    dispatch(wait());
    superagent
      .get('http://localhost:4000/resent_modules')
      .set('Accept', 'application/json')
      .query({ userId, languageId })
      .send()
      .end((err, res) => {
        if (err) {
          dispatch(error('ошибка составления сборного теста'));
        } else {
          if (res.text) {
            const answer = JSON.parse(res.text);
            dispatch(getRevisionModuleSuccess(answer));
          }
          dispatch(success());
        }
      });
  };
  
};

export const getRevisionModuleSuccess = (data) => ({
  type: courseConstants.REVISION,
  modules: data.content,
});