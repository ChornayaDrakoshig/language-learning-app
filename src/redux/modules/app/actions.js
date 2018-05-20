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

export const setFilterText = (searchText) => ({
  type: appConstants.SET_FILTER_SEARCH_TEXT,
  searchText: searchText.trim(),
});

export const setFilterTag = (searchTag) => ({
  type: appConstants.SET_FILTER_TAG,
  searchTag,
});

export const setFilterOnLearning = (onLearningToggle) => ({
  type: appConstants.SET_FILTER_LEARNING,
  onLearningToggle,
});

export const setFilterNew = (newToggle) => ({
  type: appConstants.SET_FILTER_NEW,
  newToggle,
});
