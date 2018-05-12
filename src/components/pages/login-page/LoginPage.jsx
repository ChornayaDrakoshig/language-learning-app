import React from 'react';
import { Alert } from 'react-bootstrap';
import LoginForm from './login-form';

/*
<Alert bsStyle="warning">
  <strong>Holy guacamole!</strong> Best check yo self, you're not looking too
  good.
</Alert>
*/

function LoginPage(props) {
  return (
    <div>
      <div>
        {props.errorMessage}
      </div>
      <LoginForm />
    </div>
  );
}
export default LoginPage;