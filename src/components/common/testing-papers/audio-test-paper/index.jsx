import React from 'react';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import { FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import { withStyles } from 'material-ui/styles';
import PlayArrow from 'material-ui-icons/PlayArrow';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import TestingPageWrapper from '../TestingPageWrapper';

const styles = {
  root: {
  },
  buttonBase: {
    borderRadius: '30px',
  },
  button: {
    margin: 10,
    color: "#fff",
    backgroundColor: "#373737",
    width: 60,
    height: 60,
  },
};


class AudioTestPaper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onPlayButtonClick=this.onPlayButtonClick.bind(this);
  }
  
  onPlayButtonClick() {
    let status = this.state.isPlaying;
  
    if(status === true) {
      status = false; this.props.item.audio.play();
    } else {
      status = true; this.props.item.audio.pause();
    }
    this.setState({ isPlaying: status });
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    // TODO обработка знаков препинания
    event.preventDefault();
    const answer = {
      id: this.props.item.id,
      isCorrect: (this.state.value.trim().toLowerCase() === this.props.item.target_language.toLowerCase()),
      questionType: 'audio',
      answer: this.state.value,
    };

    this.props.onNextButtonClick(answer);
  }
 
  renderQuestion() {
    const {classes} = this.props;

    return (
      <React.Fragment>
        <Grid item>
          <IconButton
            className={classes.button}
            style={{backgroundColor: "#373737"}}
            aria-label="Delete"
            onClick={this.onPlayButtonClick}
          >
            <PlayArrow />
          </IconButton>
          <audio id="audio"><source src={this.props.item.audioSrc} alt={this.props.item.native_language} /></audio>
        </Grid>
                    
        <Grid item>
          <FormGroup>
            <ControlLabel>Введите услышанное</ControlLabel>
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

export default withStyles(styles)(AudioTestPaper);