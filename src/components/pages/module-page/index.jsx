import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getCurrentModule} from 'redux/modules/courses/actions.js';
import ModulePage from './ModulePage.jsx';

function mapStateToProps(state) {
  return {
    learningData: state.courses.currentModule || [], 
    modulesInfo: state.courses.currentCourse || [],
    tagsList: state.courses.tagsList || [],
    userId: state.user.id,
    languageId: state.app.currentCourse,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCurrentModule: bindActionCreators(getCurrentModule, dispatch),
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(ModulePage);
