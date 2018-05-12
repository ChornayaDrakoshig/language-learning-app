import React from 'react';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import LoadingContainer from 'components/common/loading-container';
import AppPageStructure from 'components/common/app-page-structure';
import LanguagePaper from './language-paper';
import { CircularProgress } from 'material-ui/Progress';

class CoursesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  componentDidMount(){
    this.props.getAllCoursesList(this.props.userId);
  }
  
  renderNewCourses() {
    if (this.props.newCourses) {
      return (
        <React.Fragment>
          <Grid>
            <Typography type="title">Доступные курсы</Typography>
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
    if (this.props.coursesOnLearning) {
      return (
        <React.Fragment>
          <Grid>
            <Typography  type="title">Вы изучаете</Typography>
          </Grid>
          <Grid container justify="flex-start" spacing={16}>
            {this.props.coursesOnLearning.map((language) => 
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
export default CoursesPage;