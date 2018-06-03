import React from 'react';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import LoadingContainer from 'components/common/loading-container';
import AppPageStructure from 'components/common/app-page-structure';
import LanguagePaper from './language-paper';
import { withStyles } from 'material-ui/styles';

const styles = {
  root: {
    marginTop: 30,
    marginBottom: -5,
  },
};

class CoursesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  componentDidMount(){
    this.props.getAllCoursesList(this.props.userId);
    this.props.setCurrentCourse(0);
  }
  
  renderNewCourses() {
    const { classes } = this.props;

    if (this.props.newCourses) {
      return (
        <React.Fragment>
          <Grid>
            <Typography type="title" className={classes.root}>Доступные курсы</Typography>
          </Grid>
          <Grid container justify="flex-start" spacing={16}>
            {this.props.newCourses.map((language) => 
              <LanguagePaper 
                key={language.id}
                id={language.id}
                title={language.language}
                image={language.imageSrc}
                onLearning={language.onLearnig}
              />
            )}
          </Grid>
        </React.Fragment>
      );
    } else {
      return null;
    }
  }

  renderCoursesOnLearning() {
    const { classes } = this.props;

    if (this.props.coursesOnLearning) {
      return (
        <React.Fragment>
          <Grid>
            <Typography  type="title" className={classes.root}>Вы изучаете</Typography>
          </Grid>
          <Grid container justify="flex-start" spacing={16}>
            {this.props.coursesOnLearning.map((language) => 
              <LanguagePaper 
                key={language.id}
                id={language.id}
                title={language.language}
                image={language.imageSrc}
                onLearning={language.onLearning}
              />
            )}
          </Grid>
        </React.Fragment>
      );    
    } else {
      return null;
    }
  }

  render() {
    return (
      <AppPageStructure>
        <LoadingContainer
          appIsLoading={this.props.appIsLoading}
          appHasNoContentYet={this.props.coursesOnLearning.length === 0 &&  this.props.newCourses.length === 0}
          errorMessage={this.props.errorMessage}
        >
          {this.renderCoursesOnLearning()}
          {this.renderNewCourses()}
        </LoadingContainer>
      </AppPageStructure>  
    );
  }
}

export default withStyles(styles)(CoursesPage);