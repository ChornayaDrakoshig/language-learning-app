import React from 'react';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
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
  
  renderCourses() {
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
    <Grid>
      <Typography  type="title">Доступные курсы</Typography>
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
  }

  render(){
    if (this.props.appIsLoading) {
      return (
        <AppPageStructure>
        <Grid container justify="center" alignItems="center" spacing={16}>
          <Grid item>
            <CircularProgress size={50} />
          </Grid>        
        </Grid>
        </AppPageStructure>  
      );
    } else {
      return (
        <AppPageStructure>
          {this.renderCourses()}
        </AppPageStructure>
      );
    }
}
}
export default CoursesPage;