import React from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import { withStyles } from 'material-ui/styles';

const styles = {
  root: {
    padding: 20,
    minHeight: 280,
  },
  image: {
    marginTop: 10,
    maxHeight: 150,
  },
};


class ImageTestPaper extends React.Component {
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
          <FormGroup>
            <ControlLabel>Введите название на иностранном языке:</ControlLabel>
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

export default withStyles(styles)(ImageTestPaper);