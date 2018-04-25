import React from 'react';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import { withStyles } from 'material-ui/styles';
import PlayArrow from 'material-ui-icons/PlayArrow'

const styles = {
  root: {
    minWidth: 450,
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


class WordPaper extends React.Component {
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
            <img src="https://pureinfotech.com/wp-content/uploads/2017/09/forest-trees-theme-windows.jpg" className={classes.image} />
          </Grid>

          <Grid item>
            <IconButton className={classes.button} aria-label="Delete" >
              <PlayArrow />
            </IconButton>
          </Grid>
                    
          <Grid item>
            <Grid container justify="space-between">
              <Grid item>
                <Typography type="title">Слово</Typography>
              </Grid>
              <Grid item>
              <Typography type="title">-</Typography>  
              </Grid>
            <Grid item>
              <Typography type="title">Перевод</Typography>  
              </Grid>
            
            </Grid>
          </Grid>

        </Grid>
      </Paper>
    </Grid>
  );
}
}

export default withStyles(styles)(WordPaper);