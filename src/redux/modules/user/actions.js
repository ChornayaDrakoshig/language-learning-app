import {userConstants} from './actionConstants.js';

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

export const logout = () => ({
  type: userConstants.LOGOUT,
});
