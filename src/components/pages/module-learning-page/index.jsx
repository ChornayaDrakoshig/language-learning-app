import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getCurrentCourse} from 'redux/modules/courses/actions.js';
import ModuleLearningPage from './ModuleLearningPage.jsx';

function mapStateToProps(state) {
  return {
    //newModules: (state.courses.currentCourse.length > 0) ? state.courses.currentCourse.filter((language) => {return !language.learned} ) : [], 
  };
}
function mapDispatchToProps(dispatch) {
  return {
    //getCurrentCourse: bindActionCreators(getCurrentCourse, dispatch),
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(ModuleLearningPage);
