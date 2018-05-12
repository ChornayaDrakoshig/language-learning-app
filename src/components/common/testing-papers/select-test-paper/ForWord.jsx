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
  image: {
    marginTop: 10,
    maxHeight: 200,
  },
  buttonBase: {
    borderRadius: '30px',
  },
  button: {
    margin: 10,
    width: 60,
    height: 60
  },
};

const createOptions = (item) => {
  let options = [].concat(item.extra.slice(0,3));
  delete item.extra;
  options.push(item);
  options = mixArray(options);

  return options;
}

class SelectTestPaperForWord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: createOptions(props.item),
      value: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(id) {
    this.setState({value: id});
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.value > 0) {
      const answer = {
        id: this.props.item.id,
        isCorrect: (this.props.item.id === this.state.value),
        questionType: 'selection',
      };
  
      this.props.onNextButtonClick(answer);
    }
  }
   
  renderQuestion() {
    const {classes} = this.props;

    return (
      <React.Fragment>
        <Grid item>
          <Typography type="title">{this.props.item.native_language}</Typography>
        </Grid>
        
        <Grid item>
          <Typography type="title">Выберите перевод</Typography>
        </Grid>
        <Grid item>
          <Grid container justify="center" alignItems="center" spacing={16}>
            {this.state.options.map((item) => 
              <Grid item key={item.id}>
                <Button
                  raised
                  name={item.id}
                  color={(item.id === this.state.value) ? 'secondary' : 'default'}
                  className={classes.button}
                  onClick={() => this.handleChange(item.id)}
                >
                  {item.target_language}
                </Button>
              </Grid>
            )}
          </Grid>
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

export default withStyles(styles)(SelectTestPaperForWord);