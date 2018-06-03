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
  menuButtons: {
    padding: 15,
    width: '100%',
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

  renderInfo() {
    const getItemById = (items, itemId) => {
      const findItem = item => {
        return item.id === Number(itemId);
      };
      return items.find(findItem) || {};
    };
    const currentModule = getItemById(this.props.modulesInfo, this.props.match.params.moduleId);
    const currentTag = getItemById(this.props.tagsList, currentModule.tag_id);
    
    if (!currentModule) return null;
    return (
      <React.Fragment>
        <Grid item xs={12}> 
          <Typography align="center" type="title">{currentModule.title}</Typography>
        </Grid>
        <Grid item xs={12}> 
          <Typography align="center" type="subheading">Категория: {currentTag.name}</Typography> 
        </Grid>
        <Grid item xs={12}> 
          <Typography align="center" type="subheading">Уровень: {currentModule.level}</Typography> 
        </Grid>
      </React.Fragment>
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <AppPageStructure>
        <Grid container justify="flex-start" spacing={40} className={classes.root}>
        <Button component={Link} to={`/course/${this.props.languageId}`}>
          <KeyboardArrowLeft />
            <Typography>Назад к списку курсов</Typography>
          </Button>
        </Grid>
        <Grid container justify="center" spacing={16} className={classes.root}>
          {this.renderInfo()}
          <Grid item xs={6}> 
            <Paper elevation={1}>
              <Button className={classes.menuButtons} component={Link} to={`/module/${this.props.match.params.moduleId}/words`}>
                <Typography>Изучить слова</Typography>
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={1}>
              <Button className={classes.menuButtons} component={Link} to={`/module/${this.props.match.params.moduleId}/test`}>
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