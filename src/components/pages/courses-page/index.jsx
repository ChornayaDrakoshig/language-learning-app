import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getAllCoursesList} from 'redux/modules/courses/actions.js';
import CoursesPage from './CoursesPage.jsx';

function mapStateToProps(state) {
  return {
    coursesOnLearning: (state.courses.allCoursesList) ? state.courses.allCoursesList.filter((language) => {return language.onLearning} ) : [], 
    newCourses: (state.courses.allCoursesList) ? state.courses.allCoursesList.filter((language) => {return !language.onLearning} ) : [], 
    userId: state.user.id,
    appIsLoading: state.app.isLoading,
    errorMessage: state.app.alert,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllCoursesList: bindActionCreators(getAllCoursesList, dispatch),
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(CoursesPage);
