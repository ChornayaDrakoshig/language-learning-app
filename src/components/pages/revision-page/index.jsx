import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { getRevisionModule, updateModuleAfterTesting } from 'redux/modules/courses/actions.js';
import { wait, success } from 'redux/modules/app/actions.js';
import RevisionPage from './RevisionPage.jsx';

function mapStateToProps(state) {
  return {
    userId: state.user.id,
    learningData: (state.courses.revisionModule) ? state.courses.revisionModule : [],
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
    getRevisionModule: bindActionCreators(getRevisionModule, dispatch),
    updateModuleAfterTesting: bindActionCreators(updateModuleAfterTesting, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RevisionPage);
