import React from 'react';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import AppPageStructure from 'components/common/app-page-structure';
import WordPaper from './word-paper';

const styles = {
  root: {
    marginTop: 25,
  },
};

class ModulePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inEnded: false,
      currentQuestion: 0,
      updRequestIsSent: false,
    };
    
    this.onNextButtonClick=this.onNextButtonClick.bind(this);
  }
  
  onNextButtonClick() {
    const number = this.state.currentQuestion;
    
    if (number === this.props.learningData.length - 1) {
      this.setState({isEnded: true, updRequestIsSent: true}, () => 
        this.props.updateModuleAfterLearning(this.props.userId, this.props.match.params.moduleId, this.props.languageId)
      );
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
            Поздравляем, вы изучили модуль!
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Button raised component={Link} to={`/course/${1}`}>
            Вернуться к странице курса
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button raised component={Link} to={`/module/${this.props.match.params.moduleId}/test`} >
            Пройти тест
          </Button>
        </Grid>
      </Grid>
    );
  }
  
  renderWordForLearning() {
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
        <WordPaper content={this.props.learningData[this.state.currentQuestion]} />
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

render() {
  const {classes} = this.props;
  
  return (
    <AppPageStructure>
      {(this.state.isEnded) ? this.renderEndingMessage() : this.renderWordForLearning()}
    </AppPageStructure>
  );
}
}
  
export default withStyles(styles)(ModulePage);