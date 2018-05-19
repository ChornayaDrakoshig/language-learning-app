import {userConstants} from './actionConstants.js';
import { wait, success, error } from 'redux/modules/app/actions.js';
const superagent = require('superagent');

export const login = (login, password) => {
  return dispatch => {
    dispatch(wait());
    superagent
      .get('http://localhost:4000/user')
      .set('Accept', 'application/json')
      .query({ login, password })
      .send()
      .end((err, res) => {
        if (err) {
          dispatch(error('ошибка логина'));
        } else {
          const answer = JSON.parse(res.text);
          if (answer.length > 0) {
            dispatch(loginSuccess(answer[0]));
            dispatch(success());
          } else {
            dispatch(error('ошибка логина'));
          }
        }
      });
  };
};

export const loginSuccess = (data) => ({
  type: userConstants.LOGIN,
  user: {
    id: data.id,
    login: data.login,
    email: data.email,
    status: data.account_status,
    //// TODO сделать аватары
    avatar: 'https://pp.userapi.com/c319824/v319824552/3df8/AA2gQQiV5_s.jpg',
    learningPatterns: {
      '0': {
        audio: (25 / 25),
        images: (25 / 25),
        selecting: (25 / 25),
        typing: (25 / 25),
      },
    },
  },
});

export const getLearningPatternSuccess = (data) => {  
  let learningPattern = {};
  learningPattern[data.language_id] = {
      audio: (data.aud_success > 0) ? (data.aud_total / data.aud_success) : 1,
      images: (data.img_success > 0) ? (data.img_total / data.img_success) : 1,
      selecting: (data.sel_success > 0) ? (data.sel_total / data.sel_success) : 1,
      typing: (data.wri_success > 0) ? (data.wri_total / data.wri_success) : 1,
    }  

  return {
    type: userConstants.GET_LEARNING_PATTERNS,
    pattern: learningPattern,
  }
};

export const logout = () => ({
  type: userConstants.LOGOUT,
});
