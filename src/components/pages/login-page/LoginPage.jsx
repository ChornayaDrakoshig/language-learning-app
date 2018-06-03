import React from 'react';
import Grid from 'material-ui/Grid';
import LoginForm from './login-form';
import LoadingContainer from 'components/common/loading-container';
import { withStyles } from 'material-ui/styles';
import LargeLogo from 'assets/images/logo_large.png';

const styles = {
  root: {
    width: '100%',
  },
  logo: {
    height: 130,
    marginTop: 40,
  }
};

function LoginPage(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <LoadingContainer
        appIsLoading={props.appIsLoading}
        appHasNoContentYet={false}
        errorMessage={props.errorMessage}
      >
        <Grid container justify="center" alignItems="center" direction="column" spacing={40} className={classes.root}>
          <Grid item>
            <img src={LargeLogo} alt="logo" className={classes.logo} />
          </Grid>
          <Grid item>
            <LoginForm />
          </Grid>
        </Grid>
      </LoadingContainer>
    </div>
  );
}
export default withStyles(styles)(LoginPage);