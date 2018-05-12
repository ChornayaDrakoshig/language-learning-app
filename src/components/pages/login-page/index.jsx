import {connect} from 'react-redux';
import LoginPage from './LoginPage.jsx';

function mapStateToProps(state) {
  return {
    appIsLoading: state.app.isLoading,
    errorMessage: state.app.alert,
  };
}

export default connect(mapStateToProps)(LoginPage);
