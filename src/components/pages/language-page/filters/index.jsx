import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setFilterText, setFilterTag, setFilterOnLearning, setFilterNew } from 'redux/modules/app/actions.js';
import Filters from './Filters.jsx';

function mapStateToProps(state) {
  return {
    searchRow: state.app.filters.searchRow,
    tag: state.app.filters.tag,
    showOnLearning: state.app.filters.showOnLearning,
    showNew: state.app.filters.showNew,
    tagList: state.courses.tagsList,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setFilterText: bindActionCreators(setFilterText, dispatch),
    setFilterTag: bindActionCreators(setFilterTag, dispatch),
    setFilterOnLearning: bindActionCreators(setFilterOnLearning, dispatch),
    setFilterNew: bindActionCreators(setFilterNew, dispatch),
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Filters);
