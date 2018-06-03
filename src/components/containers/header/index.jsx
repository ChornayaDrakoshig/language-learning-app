import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from 'redux/modules/user/actions.js';
import Header from './Header.jsx';

function mapStateToProps(state) {
  return {
    user: (state.user) ? state.user : {
      login: 'Anonym', avatar: 'https://silaproject.com/files/img/empty.png'
    },
    languages: (state.courses.allCoursesList.length > 0) ? state.courses.allCoursesList : [], 
    currentCourse: state.app.currentCourse,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    logout: bindActionCreators(logout, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);