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
      anchorEl: null,
      open: true,
    };
  }

  menuRef: HTMLElement;

  handleProfileClick() {
    this.setState({ anchorEl: this.menuRef });
  }

  handleLogoutClick() {
    this.handleClose();
  /// logout
  }

  handleClose() {
    this.setState({ anchorEl: null });
  }

  renderUserProfile() {
    return (
      <React.Fragment>
        <Grid item sm={4} xs={12}>
          <Grid
            container
            spacing={0}
            justify="flex-end"
            alignItems="center"
            onClick={this.handleProfileClick}
          >
            <div className={this.props.classes.hover} onClick={this.handleProfileClick}>
              <Typography type="subheading" className="header-bar-username">
                {`${this.props.user.FirstName} ${this.props.user.LastName}`}
              </Typography>
              <div
                ref={div => {
                  this.menuRef = div;
                }}
                style={{ display: 'inline-block' }}
              >
                <Avatar alt="Username" src={this.props.user.PhotoUrl} />
              </div>
            </div>
          </Grid>
        </Grid>
        <Menu
          id="simple-menu"
          className={this.props.classes.menuDown}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleLogoutClick}>Logout</MenuItem>
        </Menu>
      </React.Fragment>
    );
  }
  render() {
    const UserProfile = this.props.user ? this.renderUserProfile() : null;
    const justify = this.props.user ? 'flex-end' : 'center';
    const link = '/404';
    return (
      <Grid item xs={12} id="header-bar">
        <AppBar position="static" color="default">
          <Toolbar>
            <Grid container spacing={8} justify={justify} alignItems="center">
              <Grid item sm={4} xs={12} className={this.props.user ? 'hide-on-mobile' : ''}>
                блок
              </Grid>
              {UserProfile}
            </Grid>
          </Toolbar>
        </AppBar>
      </Grid>
    );
  }
}
export default Header;