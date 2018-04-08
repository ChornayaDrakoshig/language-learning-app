import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getCurrentCourse} from 'redux/modules/courses/actions.js';
import LanguagePage from './LanguagePage.jsx';

function mapStateToProps(state) {
  return {
    learnedModules: (state.courses.currentCourse.length > 0) ? state.courses.currentCourse.filter((language) => {return language.learned} ) : [], 
    newModules: (state.courses.currentCourse.length > 0) ? state.courses.currentCourse.filter((language) => {return !language.learned} ) : [], 
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getCurrentCourse: bindActionCreators(getCurrentCourse, dispatch),
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(LanguagePage);
