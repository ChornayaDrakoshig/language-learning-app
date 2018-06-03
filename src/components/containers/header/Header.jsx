import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
//import { Link } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import ExitToApp from 'material-ui-icons/ExitToApp';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Logo from 'assets/images/logo_small_white.png';
import { withStyles } from 'material-ui/styles';

const styles = {
  root: {
  },
  logo: {
    width: 46,
  },
  text: {
    color: 'white',
    fontWeight: 600,
  },
  image: {
    border: 'solid 2px white',
    borderRadius: 60,
  }
};

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

    const { classes } = this.props;

    return (
      <Grid item xs={6}>
        <Grid
          container
          spacing={8}
          justify="flex-start"
          alignItems="center"
        >
          <Grid item>
            <img alt="logo" src={Logo} className={classes.logo} />
          </Grid>    
          {('id' in showLanguage) && 
            <React.Fragment>
              <Grid item>
                <Avatar alt="language" src={showLanguage.imageSrc} className={classes.image} />
              </Grid>
              <Grid item>
                <Typography type="subheading" className={classes.text}>
                  {showLanguage.language}
                </Typography>
              </Grid>
            </React.Fragment>
          }
        </Grid>
      </Grid>
    );
    
  }
  
  renderUserProfile() {
    const { classes } = this.props;

    return (
      <Grid item xs={6}>
        <Grid
          container
          spacing={8}
          justify="flex-end"
          alignItems="center"
        >
          <Grid item>
            <Typography type="subheading" className={classes.text}>
              {this.props.user.login}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar alt="Username" src={this.props.user.avatar} className={classes.image}/>
          </Grid>
          <Grid item>
          <IconButton
            aria-label="Exit"
            onClick={this.props.logout}
            className={classes.text}
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
        <AppBar position="static" color="secondary">
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
export default withStyles(styles)(Header);