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
  
  componentDidMount(){
    if (this.props.learningData.length > 0 ) {
      this.props.wait();
    } else {
      this.props.getCurrentModule(this.props.userId, this.props.match.params.moduleId);
    }
    
    this.setState({questions: this.createTestingMaterials()}, () => this.props.success());

    // TODO собрать тест
    // TODO success;
  }

  createTestingMaterials() {
    const { learningPatterns, extraQuestions, languageId } = this.props;
    let testData = [].concat(this.props.learningData);

    if (this.props.learningData.length > 0) {
      this.props.extraQuestions.forEach(item => {
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
      console.log(this.props.learningPatterns[1]);
      let breakPointsSum = 0;
      for (let item in this.props.learningPatterns[this.props.languageId]) {
        breakPointsSum += this.props.learningPatterns[this.props.languageId][item];
      }
      console.log(breakPointsSum);
      const breakPoint1 = this.props.learningPatterns[this.props.languageId].audio / breakPointsSum;
      const breakPoint2 = breakPoint1 + this.props.learningPatterns[this.props.languageId].images / breakPointsSum;
      const breakPoint3 = breakPoint2 + this.props.learningPatterns[this.props.languageId].selecting / breakPointsSum;
      console.log(breakPoint1);
      console.log(breakPoint2);
      console.log(breakPoint3);

      /// TODO если тип "выбор для слова" генерить доп материалы
      testData = testData.map(item => {
          const questionType = Math.random();
          let type = '';
          if (questionType <= breakPoint1) {
            type = 'audio';
          } else if (questionType <= breakPoint2) {
            type = 'image'
          } else if (questionType <= breakPoint3 && item.type === 'word') {
            type = 'selectionW';
          } else if (questionType <= breakPoint3 && item.type === 'sentence') {
            type = 'selectionS';
          } else {
            type = 'typing';
          }

          return {...item, type};
        }
      );
    }
    return testData;
  }

  onNextButtonClick() {
    const number = this.state.currentQuestion;
    
    if (number === this.state.questions.length - 1) {
      this.setState({isEnded: true});  
    }
    else {
      this.setState({currentQuestion: number+1});
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
      case 'audio': return <AudioTestPaper item={this.props.learningData[this.state.currentQuestion]} />;
      case 'image': return <ImageTestPaper item={this.props.learningData[this.state.currentQuestion]} />;
      case 'typing': return <TypingTestPaper item={this.props.learningData[this.state.currentQuestion]} />;
      case 'selectionW': return <SelectTestPaperForWord item={this.props.learningData[this.state.currentQuestion]} />;
      case 'selectionS': return <SelectTestPaperForSentence item={this.props.learningData[this.state.currentQuestion]} />;
    }
  }

render() {
  if (this.props.appIsLoading) {
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