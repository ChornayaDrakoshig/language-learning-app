import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import * as redux from 'redux';
import history from './history';
import { connect } from 'react-redux';
import PrivateRoute from './custom-routes/PrivateRoute';
import PublicRoute from './custom-routes/PublicRoute';
import CoursesPage from 'components/pages/courses-page';
import ErrorPage from 'components/pages/error-page';
import LanguagePage from 'components/pages/language-page';
import LoginPage from 'components/pages/login-page';
import ModuleLearningPage from 'components/pages/module-learning-page';
import ModuleTestingPage from 'components/pages/module-testing-page';
import ModulePage from 'components/pages/module-page';
import ProfilePage from 'components/pages/profile-page';
import SignupPage from 'components/pages/signup-page';

function AppRouter(props) {
  return (
    <Router history={history}>
      <Switch>
        <PublicRoute exact user={props.user} path="/login" component={LoginPage} />
        <PublicRoute exact user={props.user} path="/signup" component={SignupPage} />
        <PrivateRoute
          exact
          user={props.user}
          path="/course/:language"
          component={LanguagePage}
        />
        <PrivateRoute
          exact
          user={props.user}
          path="/courses"
          component={CoursesPage}
        />
        <PrivateRoute
          exact
          user={props.user}
          path="/module/:moduleId"
          component={ModulePage}
        />
        <PrivateRoute
          exact
          user={props.user}
          path="/module/:moduleId/words"
          component={ModuleLearningPage}
        />
        <PrivateRoute
          exact
          user={props.user}
          path="/module/:moduleId/test"
          component={ModuleTestingPage}
        />
        <PrivateRoute
          exact
          user={props.user}
          path="/profile"
          component={ProfilePage}
        />
        <Route exact path="/404" component={ErrorPage} />

        <Redirect from="/" exact to="/login" />
        <Redirect from="*" exact to="/404" />
      </Switch>
    </Router>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
};      
      
export default connect(mapStateToProps)(AppRouter);