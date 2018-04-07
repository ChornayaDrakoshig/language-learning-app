import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import CoursesPage from '../pages/courses-page';
import ErrorPage from '../pages/error-page';
import LanguagePage from '../pages/language-page';
import LoginPage from '../pages/login-page';
import ModuleLearningPage from '../pages/module-learning-page';
import ModuleTestingPage from '../pages/module-testing-page';
import ModulePage from '../pages/module-page';
import ProfilePage from '../pages/profile-page';
import SignupPage from '../pages/signup-page';

function Router(props) {
  return (
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/course/:language" component={LanguagePage} />
        <Route exact path="/courses" component={CoursesPage} />
        <Route exact path="/module/:moduleId" component={ModulePage} />
        <Route exact path="/module/:moduleId/words" component={ModuleLearningPage} />
        <Route exact path="/module/:moduleId/test" component={ModuleTestingPage} />
        <Route exact path="/profile" component={ProfilePage} />
        <Route exact path="/404" component={ErrorPage} />

        <Redirect from="/" exact to="/login" />
        <Redirect from="*" exact to="/404" />
      </Switch>
  );
}

export default Router;