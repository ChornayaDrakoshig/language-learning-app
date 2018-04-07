import React from 'react';
// import {Link} from 'react-router-dom';
import Header from 'components/containers/header';
import LoginForm from 'components/containers/login-form';
import { Link } from 'react-router-dom';

function LoginPage(props) {
  return (
    <div>
      <Header />
      <LoginForm />
      <Link to="/profile">на профиль</Link>
    </div>
  );
}
export default LoginPage;