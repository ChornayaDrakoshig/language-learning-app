import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { Link } from 'react-router-dom';
import Menu, { MenuItem } from 'material-ui/Menu';
import Avatar from 'material-ui/Avatar';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderLanguageOptions() {
    console.log(this.props.languages);
    let showLanguage = [];
    if (this.props.user && (this.props.languages.length > 0)) {
      console.log('ok selecting');
      const languageId = this.props.currentCourse;
      showLanguage = this.props.languages.filter((language) => {return (language.id === languageId)});
      if (showLanguage.length === 0) showLanguage = this.props.languages[0];
      console.log(showLanguage);
    }
    if (showLanguage.length === 0) {
      showLanguage = [
        {
          id: 0,
          title: '',
          image: 'http://question-and-answer-demo.mybluemix.net/images/question-and-answer.svg',
        },
      ];
    }
    
    return (
      <Grid item xs={6}>
        <Grid
          container
          spacing={8}
          justify="flex-start"
          alignItems="center"
        >
          <Grid item>
            <Avatar alt="language" src={showLanguage[0].image} />
          </Grid>
          <Grid item>
            <Typography type="subheading" className="header-bar-username">
              {showLanguage[0].title}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
    
  }
  
  renderUserProfile() {
    return (
      <Grid item xs={6}>
        <Grid
          container
          spacing={8}
          justify="flex-end"
          alignItems="center"
        >
          <Grid item>
            <Typography type="subheading" className="header-bar-username">
              {this.props.user.login}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar alt="Username" src={this.props.user.avatar} />
          </Grid>
        </Grid>
      </Grid>
    );
  }

  render() {
    return (
      <Grid item xs={12} id="header-bar">
        <AppBar position="static" color="default">
          <Toolbar>
            <Grid container spacing={8} justify="center" alignItems="center">
              {this.renderLanguageOptions()}
              {this.renderUserProfile()}
            </Grid>
          </Toolbar>
        </AppBar>
      </Grid>
    );
  }
}
export default Header;