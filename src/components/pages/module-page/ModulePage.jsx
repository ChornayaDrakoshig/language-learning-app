import React from 'react';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import AppPageStructure from 'components/common/app-page-structure';

const styles = {
  root: {
    marginTop: 25,
  },
};

class ModulePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  componentDidMount() {
    this.props.getCurrentModule(this.props.userId, this.props.match.params.moduleId)
  }
render() {
  const { classes } = this.props;
  
// TODO id языка дл ссылки назад берем из данных
  return (
    <AppPageStructure>
      <Grid container justify="flex-start" spacing={16} className={classes.root}>
       <Button component={Link} to={`/course/${1}`}>
         <KeyboardArrowLeft />
          <Typography>Назад к списку курсов</Typography>
        </Button>
      </Grid>
      <Grid container justify="center" spacing={16} className={classes.root}>
        <Grid item xs={6}> 
          <Paper elevation={1}>
            <Button component={Link} to={`/module/${this.props.match.params.moduleId}/words`}>
              <Typography>Изучить слова</Typography>
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={1}>
            <Button component={Link} to={`/module/${this.props.match.params.moduleId}/test`}>
              <Typography>Пройти тест</Typography>
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </AppPageStructure>
  );
}
}
export default withStyles(styles)(ModulePage);