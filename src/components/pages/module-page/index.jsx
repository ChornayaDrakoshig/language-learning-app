import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getCurrentModule} from 'redux/modules/courses/actions.js';
import ModulePage from './ModulePage.jsx';

function mapStateToProps(state) {
  return {
    learningData: (state.courses.currentModule) ? state.courses.currentModule : [], 
    userId: state.user.id,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCurrentModule: bindActionCreators(getCurrentModule, dispatch),
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(ModulePage);
