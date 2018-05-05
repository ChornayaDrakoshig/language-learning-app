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
  image: {
    marginTop: 10,
    maxHeight: 200,
  },
  buttonBase: {
    borderRadius: '30px',
  },
  button: {
    margin: 10,
    color: "#fff",
    backgroundColor: "#373737",
    width: 60,
    height: 60
  },
};


class SelectTestPaperForWord extends React.Component {
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
            <Typography type="title">Выберите перевод</Typography>
          </Grid>
          <Grid item>
            <Grid container justify="center" alignItems="center" spacing={16}>
              <Grid item>
                <Button raised className={classes.button}>Вариант 1</Button>
              </Grid>
              <Grid item>
                <Button raised className={classes.button}>Вариант 2</Button>
              </Grid>
              <Grid item>
                <Button raised color="secondary" className={classes.button}>Вариант 3</Button>
              </Grid>
              <Grid item>
                <Button raised className={classes.button}>Вариант 4</Button>
              </Grid>
            </Grid>
          </Grid>

        </Grid>
      </Paper>
    </Grid>
  );
}
}

export default withStyles(styles)(SelectTestPaperForWord);