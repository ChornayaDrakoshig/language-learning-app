import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {HashRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles/clear.css';
import AppRouter from './components/containers/Router.jsx';
import reducer from './redux/rootReducer.js';

const loggerMiddleware = createLogger();

const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);
ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </HashRouter>,
  document.getElementById('root'),
);
