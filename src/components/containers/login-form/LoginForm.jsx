import * as React from 'react';
import Button from 'material-ui/Button';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick() {
    /// TODO поля формы и из валидация
    this.props.login();
  }

  render() {
    return(
      <Button
        raised
        color="primary"
        onClick={() => this.handleButtonClick()}
      >
        Войти
      </Button>
    );
  }
}
export default LoginForm;