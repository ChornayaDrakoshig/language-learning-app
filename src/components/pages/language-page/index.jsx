import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getCurrentCourse} from 'redux/modules/courses/actions.js';
import {setCurrentCourse} from 'redux/modules/app/actions.js';
import LanguagePage from './LanguagePage.jsx';

function mapStateToProps(state) {
  return {
    searchRow: state.app.filters.searchRow,
    tag: state.app.filters.tag,
    showOnLearning: state.app.filters.showOnLearning,
    showNew: state.app.filters.showNew,
    tagList: state.courses.tagsList,
    modules: state.courses.currentCourse, 
    userId: state.user.id,
    appIsLoading: state.app.isLoading,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getCurrentCourse: bindActionCreators(getCurrentCourse, dispatch),
    setCurrentCourse: bindActionCreators(setCurrentCourse, dispatch),
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(LanguagePage);
