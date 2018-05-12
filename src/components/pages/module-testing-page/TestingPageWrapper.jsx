import React from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';

const styles = {
  root: {
    padding: 20,
    minHeight: 280,
  },
};

class TestingPageWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render(){
  const {classes} = this.props;
  
  return (
    <React.Fragment>
    <Grid item xs={12} >
      <Paper elevation={1} className={classes.root}>
        <Grid container direction="column" justify="center" alignItems="center" spacing={16}>
         {this.props.question}
        </Grid>
      </Paper>
    </Grid>
    <Grid item xs={12}>
    <Grid container justify="flex-end" spacing={16} className={classes.root}>
      <Grid item>
        {this.props.button}
      </Grid>
    </Grid>    
  </Grid>
  </React.Fragment>
  );
}
}

export default withStyles(styles)(TestingPageWrapper);