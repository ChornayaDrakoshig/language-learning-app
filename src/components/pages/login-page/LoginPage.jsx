import React from 'react';
import Grid from 'material-ui/Grid';
import LoginForm from './login-form';
import LoadingContainer from 'components/common/loading-container';

function LoginPage(props) {
  return (
    <LoadingContainer
      appIsLoading={props.appIsLoading}
      appHasNoContentYet={false}
      errorMessage={props.errorMessage}
    >
      <Grid container justify="center" alignItems="center" spacing={16}>
        <Grid item>
          <LoginForm />
        </Grid>
      </Grid>
    </LoadingContainer>
  );
}
export default LoginPage;