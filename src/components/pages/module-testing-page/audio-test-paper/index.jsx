import React from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import { FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import { withStyles } from 'material-ui/styles';
import PlayArrow from 'material-ui-icons/PlayArrow';


const styles = {
  root: {
    padding: 20,
    minHeight: 280,
  },
  buttonBase: {
    borderRadius: '30px',
  },
  button: {
    margin: 10,
    color: "#fff",
    backgroundColor: "#373737",
    width: 60,
    height: 60,
  },
};


class AudioTestPaper extends React.Component {
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
            <IconButton className={classes.button} aria-label="Delete" >
              <PlayArrow />
            </IconButton>
          </Grid>
                    
          <Grid item>
            <FormGroup>
              <ControlLabel>Введите услышанное</ControlLabel>
              <FormControl
                type="text"
                value={this.state.value}
                placeholder="Ваш ответ"
              />
            </FormGroup>
          </Grid>

        </Grid>
      </Paper>
    </Grid>
  );
}
}

export default withStyles(styles)(AudioTestPaper);