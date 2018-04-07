import {combineReducers} from 'redux';
import {app} from './modules/app/reducer';
import {courses} from './modules/courses/reducer';
import {user} from './modules/user/reducer';

export default combineReducers({
  user,
  app,
  courses,
});