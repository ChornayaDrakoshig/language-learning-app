import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
//import { Link } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import ExitToApp from 'material-ui-icons/ExitToApp';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderLanguageOptions() {
    let showLanguage = {};
    const languageId = this.props.currentCourse;
    if (this.props.languages.length > 0) {
      const showLanguages = this.props.languages.filter((language) => {return (language.id === languageId)});
      if (showLanguages.length > 0) {
        showLanguage = showLanguages[0];
      }
     } 
    
    return (
      <Grid item xs={6}>
        {('id' in showLanguage) && 
          <Grid
            container
            spacing={8}
            justify="flex-start"
            alignItems="center"
          >
            <Grid item>
              <Avatar alt="language" src={showLanguage.imageSrc} />
            </Grid>
            <Grid item>
              <Typography type="subheading" className="header-bar-username">
                {showLanguage.language}
              </Typography>
            </Grid>
          </Grid>
        }
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
          <Grid item>
          <IconButton
            aria-label="Exit"
            onClick={this.props.logout}
          >
            <ExitToApp />
          </IconButton>
            
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