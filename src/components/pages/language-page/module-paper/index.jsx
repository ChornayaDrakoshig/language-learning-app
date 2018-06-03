import React from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    marginTop: 15,
  },
  onLearningMark: {
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: theme.palette.secondary.dark,
    position: 'relative',
    top: -8,
    left: -8,
  },
  space: {
    height: 16,
    position: 'relative',
    top: -8,
  }
});

class ModulePaper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
render() {
  const { classes } = this.props;
  
  return (
    <Grid item xs={12} sm={6} md={3} className={classes.root}>    
      <Paper elevation={1}>
        <div className={(this.props.module.onLearning) ? classes.onLearningMark : classes.space}></div>
        <Grid container direction="column" justify="center" alignItems="center" spacing={16}>
          <Grid item>
            <Typography type="title">{this.props.module.title}</Typography>  
          </Grid>
          <Grid item>
            <Button component={Link} to={`/module/${this.props.module.id}`}>
              Открыть модуль
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
}
export default withStyles(styles)(ModulePaper);
