import React from 'react';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import AppPageStructure from 'components/common/app-page-structure';
import AudioTestPaper from './audio-test-paper';
import ImageTestPaper from './image-test-paper';
import SelectTestPaperForWord from './select-test-paper/ForWord';
import SelectTestPaperForSentence from './select-test-paper/ForSentence';
import TypingTestPaper from './typing-test-paper';

const styles = {
  root: {
    marginTop: 25,
  },
};

class ModuleTestingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inEnded: false,
      questions: [
        {id: 1, type: 'audio'},
        {id: 2, type: 'image'},
        {id: 3, type: 'typing'},
        {id: 4, type: 'selectionW'},
        {id: 5, type: 'selectionS',}
      ],
      currentQuestion: 0,
    };
    
    this.onNextButtonClick=this.onNextButtonClick.bind(this);
  }
  
  onNextButtonClick() {
    const number = this.state.currentQuestion;
    
    if (number === this.state.questions.length - 1) {
      this.setState({isEnded: true});  
    }
    else {
      this.setState({currentQuestion: number+1});
    }
    /// как обращаться к значению предыдущего стейта
    // или как-то передавать id
  }
  
  renderEndingMessage() {
    const {classes} = this.props;
    
    return (
      <Grid container justify="center" alignItems="center" spacing={16} className={classes.root}>
        <Grid item xs={12}>
          <Typography>
            Поздравляем, вы прошли тест!
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            Здесь будут результаты
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Button raised component={Link} to={`/course/${1}`}>
            Вернуться к странице курса
          </Button>
        </Grid>
      </Grid>
    );
  }
  
  renderTestingBlock() {
    const {classes} = this.props;
    
    return (
      <React.Fragment>
      <Grid container justify="flex-start" spacing={16} className={classes.root}>
        <Button component={Link} to={`/module/${this.props.match.params.moduleId}`}>
          <KeyboardArrowLeft />
          <Typography>Назад к странице модуля</Typography>
        </Button>
      </Grid>
      <Grid container justify="center" alignItems="center" spacing={16} className={classes.root}>
        {this.renderTestingPaper()}
        <Grid item xs={12}>
          <Grid container justify="flex-end" spacing={16} className={classes.root}>
            <Grid item>
              <Button raised onClick={this.onNextButtonClick}>
                <Typography>Дальше</Typography>
              </Button>
            </Grid>
          </Grid>    
        </Grid>
      </Grid>
      </React.Fragment>
    );
  }
  
  renderTestingPaper() {
    switch (this.state.questions[this.state.currentQuestion].type) {
      case 'audio': return <AudioTestPaper />;
      case 'image': return <ImageTestPaper />;
      case 'typing': return <TypingTestPaper />;
      case 'selectionW': return <SelectTestPaperForWord />;
      case 'selectionS': return <SelectTestPaperForSentence />;
    }
  }

render() {
  const {classes} = this.props;
  
  return (
    <AppPageStructure>
      {(this.state.isEnded) ? this.renderEndingMessage() : this.renderTestingBlock()}
    </AppPageStructure>
  );
}
}
  
export default withStyles(styles)(ModuleTestingPage);