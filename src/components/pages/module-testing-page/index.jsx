import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { getCurrentModule } from 'redux/modules/courses/actions.js';
import { wait, success } from 'redux/modules/app/actions.js';
import ModuleTestingPage from './ModuleTestingPage.jsx';

function mapStateToProps(state) {
  return {
    userId: state.user.id,
    learningData: (state.courses.currentModule) ? state.courses.currentModule : [], 
    extraQuestions: (state.courses.currentTestExtraQuestions) ? state.courses.currentTestExtraQuestions : [], 
    learningPatterns: state.user.learningPatterns,
    languageId: state.app.currentCourse,
    appIsLoading: state.app.isLoading,
    errorMessage: state.app.alert,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    wait: bindActionCreators(wait, dispatch),
    success: bindActionCreators(success, dispatch),
    getCurrentModule: bindActionCreators(getCurrentModule, dispatch),
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(ModuleTestingPage);
