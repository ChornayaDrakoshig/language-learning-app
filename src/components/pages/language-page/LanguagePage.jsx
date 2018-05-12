import React from 'react';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import LoadingContainer from 'components/common/loading-container';
import AppPageStructure from 'components/common/app-page-structure';
import ModulePaper from './module-paper';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import Filters from './filters';

const styles = {
  root: {
    marginTop: 25,
  },
};

class LanguagePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  componentDidMount() {
    this.props.setCurrentCourse(Number (this.props.match.params.languageId));
    this.props.getCurrentCourse(this.props.userId, this.props.match.params.languageId);
  }

  renderModules() {
    return (
      <Grid container justify="flex-start" spacing={16}>
        {this.props.modules.map((module) => 
          <ModulePaper
            key={module.id}
            module={module}
          />
        )}
      </Grid>
    );
  }

  render() {
    const {classes} = this.props.classes;
    
    return (
      <AppPageStructure>
        <Grid className={this.props.classes.root}>
          <Button component={Link} to="/courses/">
            <KeyboardArrowLeft />
            <Typography>К списку языков</Typography>
          </Button>
        </Grid>
        <Grid container className={this.props.classes.root}>
          <Grid item xs={12}>
            <Paper elevation={1}>
            <Button>
              Начать повторение
            </Button>
            </Paper>
          </Grid>
        </Grid>
        <Grid container className={this.props.classes.root}>
          <Filters />
        </Grid>
        <LoadingContainer
          appIsLoading={this.props.appIsLoading}
          appHasNoContentYet={this.props.modules.length === 0}
          errorMessage={this.props.errorMessage}
        >
          {this.renderModules()}
        </LoadingContainer>
      </AppPageStructure>
    );
  }
}

export default withStyles(styles)(LanguagePage);
