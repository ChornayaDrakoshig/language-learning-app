import React from 'react';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import { withStyles } from 'material-ui/styles';
import PlayArrow from 'material-ui-icons/PlayArrow'

const styles = {
  root: {
    minWidth: 450,
    paddingBottom: 20,
  },
  image: {
    marginTop: 10,
    maxHeight: 200,
  },
  buttonBase: {
    borderRadius: '30px',
  },
  button: {
    margin: 10,
    color: "#fff",
//    backgroundColor: "#373737",
    width: 60,
    height: 60
  },
};


class WordPaper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
    };

    this.onPlayButtonClick=this.onPlayButtonClick.bind(this);
  }

  onPlayButtonClick() {
    let status = this.state.isPlaying;

    if(status === true) {
      status = false; this.props.content.audio.pause();
    } else {
      status = true; this.props.content.audio.play();
    }
    this.setState({ isPlaying: status });
  }

  render(){
  const {classes} = this.props;
  
  return (
    <Grid item xs={12} >
      <Paper elevation={1} className={classes.root}>
        <Grid container direction="column" justify="center" alignItems="center" spacing={16}>
          <Grid item>
            <img src={this.props.content.imageSrc} alt={this.props.content.target_language} className={classes.image} />
          </Grid>

          <Grid item>
            <IconButton
              className={classes.button}
              style={{backgroundColor: "#373737"}}
              aria-label="Delete"
              onClick={this.onPlayButtonClick}
            >
              <PlayArrow />
            </IconButton>
            <audio id="audio"><source src={this.props.content.audioSrc} alt={this.props.content.native_language} /></audio>
          </Grid>
                    
          <Grid item>
            <Grid container justify="space-between">
              <Grid item>
                <Typography type="title">{this.props.content.target_language}</Typography>
              </Grid>
              <Grid item>
              <Typography type="title">-</Typography>  
              </Grid>
            <Grid item>
              <Typography type="title">{this.props.content.native_language}</Typography>  
              </Grid>
            
            </Grid>
          </Grid>

        </Grid>
      </Paper>
    </Grid>
  );
}
}

export default withStyles(styles)(WordPaper);