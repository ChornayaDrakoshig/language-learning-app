import * as React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';

const PublicRoute = (props) => {
  const { component: Component, user, ...rest } = props;

  return (
    <Route
      {...rest}
      render={routeProps => {
        if (!('id' in user)) {
          return <Component {...routeProps} />;
        }
        return <Redirect to="/courses" />;
      }}
    />
  );
};

export default PublicRoute;