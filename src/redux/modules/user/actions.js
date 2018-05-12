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
    // TODO если не находим паттерн с нужным индексом, берем по умолчанию
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


/*
export const login = () => ({
  type: userConstants.LOGIN,
  user: {
    id: 1,
    login: 'ChornyCmok',
    email: 'chornycmok@mail.com',
    status: 'free', //// TODO сделать константы для этого
    avatar: 'https://pp.userapi.com/c319824/v319824552/3df8/AA2gQQiV5_s.jpg',
    learningPatterns: {
      '1': {
        audio: (40 / 40),
        images: (35 / 30),
        selecting: (42 / 40),
        typing: (30 / 28),
      },
      '2': {
        audio: (40 / 35),
        images: (35 / 34),
        selecting: (42 / 40),
        typing: (30 / 22),
      },
    },
  },
});
*/
export const logout = () => ({
  type: userConstants.LOGOUT,
});
