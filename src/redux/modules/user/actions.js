import {userConstants} from './actionConstants.js';

export const login = () => ({
  type: userConstants.LOGIN,
  user: {
    id: 1,
    login: 'ChornyCmok',
    email: 'chornycmok@mail.com',
    status: 'primary', //// TODO сделать константы для этого
    avatar: 'https://pp.userapi.com/c319824/v319824552/3df8/AA2gQQiV5_s.jpg',
    learningPattern: {
      audio: 25,
      images: 25,
      selecting: 25,
      typing: 25,
    },
  },
});

export const logout = () => ({
  type: userConstants.LOGOUT,
});
