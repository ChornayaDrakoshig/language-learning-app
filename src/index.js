import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import {HashRouter} from 'react-router-dom';
import AppRouter from './components/containers/Router.jsx';
import reducer from './redux/rootReducer.js';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles/clear.css';
import 'assets/styles/main.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#80DEEA',
      main: '#00BCD4',
      dark: '#00ACC1',
    },
    secondary: {
      light: '#C5E1A5',
      main: '#9CCC65',
      dark: '#7CB342',
    },
  },
});


const loggerMiddleware = createLogger();

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  )
);

ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <AppRouter />
      </MuiThemeProvider>
    </Provider>
  </HashRouter>,
  document.getElementById('root'),
);
