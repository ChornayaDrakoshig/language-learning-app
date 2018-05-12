import React from 'react';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import TestingPageWrapper from '../TestingPageWrapper';
import mixArray from 'helper/mixArray.js';

const styles = {
  root: {
  },
  button: {
    margin: 10,
  },
  answerBlock: {
    minHeight: 124,
  }
};

const createOptions = (item) => {
  let options = item.target_language.split(' ');
  options = mixArray(options);
  options = options.map(item => ({name: item, isSelected: false}));

  return options;
}


class SelectTestPaperForSentence extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: createOptions(props.item),
      value: [],
    };

    this.handleAddWord = this.handleAddWord.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAddWord(id) {
    let newValue = [].concat(this.state.value);
    newValue.push(this.state.options[id]);
    let newOptions = [].concat(this.state.options);
    newOptions[id].isSelected = true;

    this.setState({value: newValue, options: newOptions});
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.value.length > 0) {
      const answer = {
        id: this.props.item.id,
        isCorrect: (this.state.value.map(item => item.name).join(' ') === this.props.item.target_language),
        questionType: 'selection',
      };
  
      this.props.onNextButtonClick(answer);
    }
  }
 
  renderAnswer() {
    const {classes} = this.props;

    return this.state.value.map((item, key) => (
      <Button
        key={`answer${key}`}
        raised 
        className={classes.button}
      >
        {item.name}
      </Button>
    ));
  }

  renderOptions() {
    const {classes} = this.props;

    return this.state.options.map((item, key) => (
      <Button
        key={`option${key}`}
        raised
        disabled={item.isSelected}
        onClick={() => this.handleAddWord(key)} 
        className={classes.button}
      >
        {item.name}
      </Button>
    ));
  }

  renderQuestion() {
    const {classes} = this.props;

    return (
      <React.Fragment>
        <Grid item>
          <Typography type="title">{this.props.item.native_language}</Typography>
        </Grid>
        
        <Grid item className={classes.answerBlock}>
          {this.renderAnswer()}
        </Grid>
        <Grid item>
          {this.renderOptions()}
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

export default withStyles(styles)(SelectTestPaperForSentence);