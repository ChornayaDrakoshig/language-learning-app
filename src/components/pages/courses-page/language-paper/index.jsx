import React from 'react';
import Grid from 'material-ui/Grid';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';

// TODO сделать из кнопки ссылку 
function LanguagePaper(props) {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Paper elevation={1}>
        <Grid container direction="column" justify="center" alignItems="center" spacing={16}>
          <Grid item>
            <Typography type="title">{props.title}</Typography>  
          </Grid>
          <Grid item>
            <Avatar src={props.image} />  
          </Grid>
          <Grid item>
            <Button>
              {(props.onLearning) ? 'Открыть курс' : 'Начать курс'}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default LanguagePaper;