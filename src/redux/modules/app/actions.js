import {appConstants} from './actionConstants.js';

export const wait = () => ({
  type: appConstants.WAIT,
});

export const success = () => ({
  type: appConstants.SUCCESS,
});

export const error = (message) => ({
  type: appConstants.ERROR,
  message,
});

export const setCurrentCourse = (languageId) => ({
  type: appConstants.SET_COURSE,
  languageId,
});