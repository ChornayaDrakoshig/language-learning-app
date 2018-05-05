import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getCurrentCourse} from 'redux/modules/courses/actions.js';
import {setCurrentCourse} from 'redux/modules/app/actions.js';
import LanguagePage from './LanguagePage.jsx';

function mapStateToProps(state) {
  return {
    learnedModules: (state.courses.currentCourse) ? state.courses.currentCourse.filter((language) => {return language.learned} ) : [], 
    newModules: (state.courses.currentCourse) ? state.courses.currentCourse.filter((language) => {return !language.learned} ) : [], 
    userId: state.user.id,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getCurrentCourse: bindActionCreators(getCurrentCourse, dispatch),
    setCurrentCourse: bindActionCreators(setCurrentCourse, dispatch),
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(LanguagePage);
