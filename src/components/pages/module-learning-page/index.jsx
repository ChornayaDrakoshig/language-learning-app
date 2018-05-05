import {connect} from 'react-redux';
//import {bindActionCreators} from 'redux';
//import {getCurrentCourse} from 'redux/modules/courses/actions.js';
import ModuleLearningPage from './ModuleLearningPage.jsx';

function mapStateToProps(state) {
  return {
    learningData: (state.courses.currentModule) ? state.courses.currentModule : [], 
    languageId: state.app.currentCourse,
    appIsLoading: state.app.isLoading,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    //getCurrentCourse: bindActionCreators(getCurrentCourse, dispatch),
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(ModuleLearningPage);
