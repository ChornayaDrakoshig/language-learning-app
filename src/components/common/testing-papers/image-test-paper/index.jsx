import React from 'react';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import { withStyles } from 'material-ui/styles';
import TestingPageWrapper from '../TestingPageWrapper';

const styles = {
  root: {
  },
  image: {
    marginTop: 10,
    maxHeight: 150,
  },
};

class ImageTestPaper extends React.Component {
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
      questionType: 'image',
    };

    this.props.onNextButtonClick(answer);
  }
  
  renderQuestion() {
    const {classes} = this.props;

    return (
      <React.Fragment>
        <Grid item>
          <img src={this.props.item.imageSrc} alt={this.props.item.native_language} className={classes.image} />
        </Grid>
                    
        <Grid item>
          <FormGroup>
            <ControlLabel>Что здесь изображено?</ControlLabel>
            <FormControl
              type="text"
              value={this.state.value}
              placeholder="Введите ответ на иностранном языке"
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

export default withStyles(styles)(ImageTestPaper);