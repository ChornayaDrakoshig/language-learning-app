import {appConstants} from './actionConstants.js';

export const wait = () => ({
  type: userConstants.WAIT,
});

export const success = () => ({
  type: appConstants.SUCCESS,
});

export const error = (message) => ({
  type: appConstants.ERROR,
  message,
});
