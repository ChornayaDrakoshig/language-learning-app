import {connect} from 'react-redux';
import CoursesPage from './CoursesPage.jsx';

function mapStateToProps(state) {
  return {
    coursesOnLearning: (state.courses.allCoursesList.length > 0) ? state.courses.allCoursesList.filter((language) => {return language.onLearning} ) : [], 
    newCourses: (state.courses.allCoursesList.length > 0) ? state.courses.allCoursesList.filter((language) => {return !language.onLearning} ) : [], 
  };
}

export default connect(mapStateToProps)(CoursesPage);
