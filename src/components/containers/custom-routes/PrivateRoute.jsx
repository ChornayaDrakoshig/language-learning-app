import * as React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';

const PrivateRoute = (props) => {
  const { component: Component, user, ...rest } = props;

  return (
    <Route
      {...rest}
      render={routeProps => {
        if ('id' in user) {
          <Redirect to="/courses" />;
          return <Component {...routeProps} />;
        }
        return <Redirect to="/login" />;
      }}
    />
  );
};

export default PrivateRoute;