import React from 'react';
import Grid from 'material-ui/Grid';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';

const styles = {
  root: {
    marginTop: 25,
  },
};

class LanguagePaper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
render() {
  const { classes } = this.props;
  
  return (
    <Grid item xs={12} sm={6} md={3} className={classes.root}>
      <Paper elevation={1}>
        <Grid container direction="column" justify="center" alignItems="center" spacing={16}>
          <Grid item>
            <Typography type="title">{this.props.title}</Typography>  
          </Grid>
          <Grid item>
            <Avatar src={this.props.image} />  
          </Grid>
          <Grid item>
            <Button component={Link} to={`/course/${this.props.id}`}>
              {(this.props.onLearning) ? 'Открыть курс' : 'Начать курс'}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
}

export default withStyles(styles)(LanguagePaper);
