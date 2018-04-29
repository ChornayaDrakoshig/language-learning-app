import React from 'react';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const styles = {
  root: {
    padding: 20,
    minHeight: 280,
  },
  button: {
    margin: 10,
  },
};


class SelectTestPaperForSentence extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render(){
  const {classes} = this.props;
  
  return (
    <Grid item xs={12} >
      <Paper elevation={1} className={classes.root}>
        <Grid container direction="column" justify="center" alignItems="center" spacing={16}>
          <Grid item>
            <Typography type="title">Слово</Typography>
          </Grid>
        
          <Grid item>
            <Button raised className={classes.button}>Это</Button>
            <Button raised className={classes.button}>начало</Button>
          </Grid>
          <Grid item>
            <Button raised className={classes.button}>вашего</Button>
            <Button raised className={classes.button}>ответа</Button>
            <Button raised disabled className={classes.button}>Это</Button>
            <Button raised disabled className={classes.button}>начало</Button>
          </Grid>

        </Grid>
      </Paper>
    </Grid>
  );
}
}

export default withStyles(styles)(SelectTestPaperForSentence);