import React from 'react';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import { CircularProgress } from 'material-ui/Progress';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import AppPageStructure from 'components/common/app-page-structure';
import AudioTestPaper from './audio-test-paper';
import ImageTestPaper from './image-test-paper';
import SelectTestPaperForWord from './select-test-paper/ForWord';
import SelectTestPaperForSentence from './select-test-paper/ForSentence';
import TypingTestPaper from './typing-test-paper';
import mixArray from 'helper/mixArray.js';

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
      questions: [],
      currentQuestion: 0,
      answers: [],
    };
    
    this.onNextButtonClick=this.onNextButtonClick.bind(this);
  }
  
  componentDidMount(){
    if (this.props.learningData.length > 0 ) {
      this.props.wait();
    } else {
      this.props.getCurrentModule(this.props.userId, this.props.match.params.moduleId);
    }
    
    this.setState({questions: this.createTestingMaterials()}, () => this.props.success());
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  createTestingMaterials() {
    const { learningPatterns, extraQuestions, languageId } = this.props;
    let testData = [].concat(this.props.learningData);

    if (this.props.learningData.length > 0) {
      /* добавление дополнительных вопросов */
      extraQuestions.forEach(item => {
        let dataKey = -1;
        testData.forEach((data, key) => {
          if (data.id === item.content_id) dataKey = key;
        });
        if (dataKey > -1) {
          for (let i = 0; i < item.type; i++) {
            testData.push(testData[dataKey]);
          }
        }
      });
      /* перемешивание вопросов */
      testData = mixArray(testData);
      /* присваивание типа вопроса */
      let breakPointsSum = 0;
      for (let item in learningPatterns[languageId]) {
        breakPointsSum += learningPatterns[languageId][item];
      }
      
      const breakPoint1 = learningPatterns[languageId].audio / breakPointsSum;
      const breakPoint2 = breakPoint1 + learningPatterns[languageId].images / breakPointsSum;
      const breakPoint3 = breakPoint2 + learningPatterns[languageId].selecting / breakPointsSum;
      
      testData = testData.map(item => {
        const questionType = Math.random();
        let type = '';
        let extra = [];      
        
        if (questionType <= breakPoint1) {
          type = 'audio';
        } else if (questionType <= breakPoint2) {
          type = 'image'
        } else if (questionType <= breakPoint3 && item.type === 'word') {
          extra = testData.filter(content => (content.id !== item.id && content.type === 'word'));
          type = 'selectionW';
        } else if (questionType <= breakPoint3 && item.type === 'sentence') {
          type = 'selectionS';
        } else {
          type = 'typing';
        }

        return {...item, questionType: type, extra};
      });
    }
  
    return testData;
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
      this.setState({questions, isEnded: true, answers: newAnswers});  
    }
    else {
      this.setState({questions, currentQuestion: number+1, answers: newAnswers});
    }
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
          
            <ul>
              {this.renderAnswers()}
            </ul>
          
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
    return this.state.answers.map(answer => {
      const word = this.props.learningData.filter(item => (answer.id === item.id));
      return (<li key={answer.id}>
        {`${answer.isCorrect ? 'Верно' : 'Неверно'}: ${word[0].target_language} - ${word[0].native_language}`}
      </li>)
    })
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
      case 'audio': return <AudioTestPaper key={`question-${currentQuestion}`} item={questions[currentQuestion]} onNextButtonClick={this.onNextButtonClick} />;
      case 'image': return <ImageTestPaper key={`question-${currentQuestion}`} item={questions[currentQuestion]} onNextButtonClick={this.onNextButtonClick}  />;
      case 'typing': return <TypingTestPaper key={`question-${currentQuestion}`} item={questions[currentQuestion]} onNextButtonClick={this.onNextButtonClick} />;
      case 'selectionW': return <SelectTestPaperForWord key={`question-${currentQuestion}`} item={questions[currentQuestion]} onNextButtonClick={this.onNextButtonClick} />;
      case 'selectionS': return <SelectTestPaperForSentence {...props} />;

      default: return <TypingTestPaper item={questions[currentQuestion]} onNextButtonClick={this.onNextButtonClick} />;
    }
  }

render() {
  if (this.props.appIsLoading || this.state.questions.length === 0) {
    return (
      <AppPageStructure>
      <Grid container justify="center" alignItems="center" spacing={16}>
        <Grid item>
          <CircularProgress size={50} />
        </Grid>        
      </Grid>
      </AppPageStructure>  
    );
  } else {
    return (
      <AppPageStructure>
        {(this.state.isEnded) ? this.renderEndingMessage() : this.renderTestingBlock()}
      </AppPageStructure>
    );
  }
}
}
  
export default withStyles(styles)(ModuleTestingPage);