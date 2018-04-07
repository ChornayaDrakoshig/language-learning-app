import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {login} from 'redux/modules/user/actions.js';
import {getAllCoursesList} from 'redux/modules/courses/actions.js';
import LoginForm from './LoginForm.jsx';

function mapStateToProps(state) {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {
    login: bindActionCreators(login, dispatch),
    getAllCourses: bindActionCreators(getAllCoursesList, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);