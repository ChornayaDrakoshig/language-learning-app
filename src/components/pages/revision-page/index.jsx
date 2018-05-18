import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { getCurrentModule, getRevisionModules } from 'redux/modules/courses/actions.js';
import { wait, success } from 'redux/modules/app/actions.js';
import RevisionPage from './RevisionPage.jsx';

function mapStateToProps(state) {
  return {
    userId: state.user.id,
    revisionModules: state.courses.revisionModules,
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
    getRevisionModules: bindActionCreators(getRevisionModules, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RevisionPage);
