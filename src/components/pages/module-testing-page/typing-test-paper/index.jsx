import React from 'react';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import { FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import { withStyles } from 'material-ui/styles';

const styles = {
  root: {
    padding: 20,
    minHeight: 280,
  },
};


class TypingTestPaper extends React.Component {
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
            <FormGroup>
            <ControlLabel>Введите перевод:</ControlLabel>
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

export default withStyles(styles)(TypingTestPaper);