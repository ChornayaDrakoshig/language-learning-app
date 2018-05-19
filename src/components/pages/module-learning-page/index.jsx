import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateModuleAfterLearning } from 'redux/modules/courses/actions.js';
import ModuleLearningPage from './ModuleLearningPage.jsx';

function mapStateToProps(state) {
  return {
    userId: state.user.id,
    learningData: (state.courses.currentModule) ? state.courses.currentModule : [], 
    languageId: state.app.currentCourse,
    appIsLoading: state.app.isLoading,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    updateModuleAfterLearning: bindActionCreators(updateModuleAfterLearning, dispatch),
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(ModuleLearningPage);
