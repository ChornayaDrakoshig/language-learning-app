import React from 'react';
import Grid from 'material-ui/Grid';
import { CircularProgress } from 'material-ui/Progress';
import { Alert } from 'react-bootstrap';
import { withStyles } from 'material-ui/styles';

const styles = {
  root: {
    marginTop: 50,
  },
};

class LoadingContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    const { classes } = this.props;

    if (!this.props.appIsLoading && this.props.errorMessage) {
      return (
        <Grid container justify="center" alignItems="center" spacing={16}>
          <Grid item className={classes.root}>
            <Alert bsStyle="danger">
              {this.props.errorMessage}
            </Alert>
          </Grid>        
        </Grid>
      );
    } else if (this.props.appIsLoading || this.props.appHasNoContentYet) {
      return (
        <Grid container justify="center" alignItems="center" spacing={16}>
          <Grid item className={classes.root}>
            <CircularProgress size={50} />
          </Grid>        
        </Grid>
      );
    } else {
      return (
        <React.Fragment>
          {this.props.children}
        </React.Fragment>
      );
    }
  }
}
  
export default withStyles(styles)(LoadingContainer);