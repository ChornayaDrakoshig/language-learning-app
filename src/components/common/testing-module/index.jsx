import React from 'react';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import LoadingContainer from 'components/common/loading-container';
import AppPageStructure from 'components/common/app-page-structure';
import AudioTestPaper from 'components/common/testing-papers/audio-test-paper';
import ImageTestPaper from 'components/common/testing-papers/image-test-paper';
import SelectTestPaperForWord from 'components/common/testing-papers/select-test-paper/ForWord';
import SelectTestPaperForSentence from 'components/common/testing-papers/select-test-paper/ForSentence';
import TypingTestPaper from 'components/common/testing-papers/typing-test-paper';
import mixArray from 'helper/mixArray.js';
import composeTest from 'helper/composeTest.js';
import resultsByQuestionType from 'helper/resultsByQuestionType.js';

const styles = {
  root: {
    marginTop: 25,
  },
};

class TestingModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inEnded: false,
      questions: composeTest(
        this.props.learningData, 
        this.props.learningPatterns, 
        this.props.languageId
      ),
      currentQuestion: 0,
      answers: [],
      updRequestIsSent: false,
    };
    
    this.onNextButtonClick = this.onNextButtonClick.bind(this);
    this.calculateResults = this.calculateResults.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  onNextButtonClick(answer) {
    const number = this.state.currentQuestion;
    let newAnswers = [].concat(this.state.answers);
    let questions = [].concat(this.state.questions);
    let index = -1;
    this.state.answers.forEach((item, key) => {
      if (item.id === answer.id) index = key;
    })
    if (index > -1) {
      newAnswers[index] = answer;
    } else {
      newAnswers.push(answer);
      if (!answer.isCorrect) {
        index = -1;
        questions.forEach((item, key) => {
          if (item.id === answer.id) index = key;
        });
        questions.push(questions[index]);
      }
    }
    if (number === questions.length - 1) {
      this.setState({questions, isEnded: true, answers: newAnswers}, () => this.calculateResults());  
    }
    else {
      this.setState({questions, currentQuestion: number+1, answers: newAnswers});
    }
  }
  
  calculateResults() {
    if (!this.state.updRequestIsSent) {
      const resultsByTaskType = resultsByQuestionType(this.state.answers);
      this.setState({updRequestIsSent: true}, () => 
        this.props.updateModuleAfterTesting(this.props.userId, this.props.moduleId, this.props.languageId, resultsByTaskType)
      );
    }
  }

  renderEndingMessage() {
    const {classes} = this.props;
    let persentage = 0;
    this.state.answers.forEach(item => {
      if (item.isCorrect) persentage += 1;
    });
    persentage /= this.state.answers.length;
    let endingMessageString = '';
    if (persentage >= 0.6) {
      endingMessageString = `Поздравляем, вы успешно прошли тест, правильно ответив на ${(persentage * 100).toFixed(1)}% вопросов`;
    } else {
      endingMessageString = 'Вы набрали менее 60% правильных ответов. Рекомендуем повторить этот модуль ещё раз.';
    }

    return (
      <Grid container justify="center" alignItems="center" spacing={16} className={classes.root}>
        <Grid item xs={12}>
          <Typography>
            {endingMessageString}
          </Typography>
        </Grid>
        <Grid item xs={12}>   
          <List component="nav">
            {this.renderAnswers()}
          </List>
        </Grid>
        <Grid item xs={6}>
          <Button raised component={Link} to={`/course/${1}`}>
            Вернуться к странице курса
          </Button>
        </Grid>
      </Grid>
    );
  }

  renderAnswers() {
    const errors = this.state.answers.filter(answer => (!answer.isCorrect));

    return errors.map(answer => {
      const word = this.props.learningData.filter(item => (answer.id === item.id));
      return (
        <React.Fragment key={answer.id}>
          <ListItem button>
            <ListItemText
              primary={`${word[0].target_language} - ${word[0].native_language}`}
              secondary={`Вы ответили: ${answer.answer}`}
            />
          </ListItem>
          <Divider />
        </React.Fragment>
      );
    })
  }
  
  renderTestingBlock() {
    const {classes} = this.props;
    
    return (
      <React.Fragment>
      <Grid container justify="flex-start" spacing={16} className={classes.root}>
        <Button component={Link} to={`/module/${this.props.moduleId}`}>
          <KeyboardArrowLeft />
          <Typography>Назад к странице модуля</Typography>
        </Button>
      </Grid>
      <Grid container justify="center" alignItems="center" spacing={16} className={classes.root}>
        {this.renderTestingPaper()}
      </Grid>
      </React.Fragment>
    );
  }

  renderTestingPaper() {
    const { questions, currentQuestion } = this.state;
    const props = {
      key: `question-${currentQuestion}`,
      item: questions[currentQuestion],
      onNextButtonClick: this.onNextButtonClick,
    }
    switch (questions[currentQuestion].questionType) {
      case 'audio': return <AudioTestPaper {...props} />;
      case 'image': return <ImageTestPaper {...props} />;
      case 'typing': return <TypingTestPaper {...props} />;
      case 'selectionW': return <SelectTestPaperForWord {...props} />;
      case 'selectionS': return <SelectTestPaperForSentence {...props} />;

      default: return null ;
    }
  }

  render() {
    return (
      <AppPageStructure>
        <LoadingContainer
          appIsLoading={this.props.appIsLoading}
          appHasNoContentYet={this.state.questions.length === 0}
          errorMessage={this.props.errorMessage}
        >
          {(this.state.isEnded) ? this.renderEndingMessage() : this.renderTestingBlock()}
        </LoadingContainer>
      </AppPageStructure>  
    );
  }
}
  
export default withStyles(styles)(TestingModule);