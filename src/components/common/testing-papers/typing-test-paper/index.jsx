import React from 'react';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import { withStyles } from 'material-ui/styles';
import TestingPageWrapper from '../TestingPageWrapper';

const styles = {
  root: {
  },
};

class TypingTestPaper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const answer = {
      id: this.props.item.id,
      isCorrect: (this.state.value.trim().toLowerCase() === this.props.item.target_language.toLowerCase()),
      questionType: 'typing',
    };
    this.props.onNextButtonClick(answer);
  }
  renderQuestion() {
    const {classes} = this.props;

    return (
      <React.Fragment>
        <Grid item>
          <Typography type="title">{this.props.item.native_language}</Typography>
        </Grid>
                    
        <Grid item>
          <FormGroup>
          <ControlLabel>Введите перевод:</ControlLabel>
            <FormControl
              type="text"
              value={this.state.value}
              placeholder="Ваш ответ"
              onChange={this.handleChange}
            />
          </FormGroup>      
        </Grid>
      </React.Fragment>
    );
  }

  renderButton() {
    return (
      <Button raised onClick={this.handleSubmit}>
        <Typography>Дальше</Typography>
      </Button>
    ); 
  }

  render(){  
    return (
      <TestingPageWrapper 
        question={this.renderQuestion()}
        button={this.renderButton()}
      />
    );
  }
}

export default withStyles(styles)(TypingTestPaper);