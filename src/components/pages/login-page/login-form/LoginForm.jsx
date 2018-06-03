import React from 'react';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import { withStyles } from 'material-ui/styles';


const styles = {
    root: {
      marginTop: 10,
    },
  };
  
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  
  handleSubmit(event) {
    event.preventDefault();
    const login = this.state.login.trim();
    const password = this.state.password.trim();
    if (login && password) {
      this.props.login(this.state.login, this.state.password);
    }
  }
  
  render() {  
    const { classes } = this.props;

    return (
      <Grid container direction="column" alignItems="center" justify="center" spacing={8}>
        <Grid item>
          <FormGroup>
            <ControlLabel>Логин или E-mail:</ControlLabel>
            <FormControl
              type="text"
              name="login"
              value={this.state.login}
              onChange={this.handleChange}
              className={classes.root}
            />
          </FormGroup>      
        </Grid>
        <Grid item>
          <FormGroup>
          <ControlLabel>Пароль:</ControlLabel>
            <FormControl
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              className={classes.root}
            />
          </FormGroup>      
        </Grid>
        <Grid item>
          <Button raised onClick={this.handleSubmit}>
            <Typography>Войти</Typography>
          </Button>       
        </Grid>
      </Grid>
    );
  }
}
  
export default withStyles(styles)(LoginForm);