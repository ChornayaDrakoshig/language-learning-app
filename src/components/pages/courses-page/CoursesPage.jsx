import React from 'react';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import AppPageStructure from 'components/common/app-page-structure';
import LanguagePaper from './language-paper';

function CoursesPage(props) {
  /// TODO если меньше чем строка -- все по центру, иначе по краю
  return (
    <AppPageStructure>
      <Grid>
        <Typography  type="title">Вы изучаете</Typography>
      </Grid>
      <Grid container justify="flex-start" spacing={16}>
        {props.coursesOnLearning.map((language) => 
          <LanguagePaper 
            key={language.id}
            id={language.id}
            title={language.title}
            image={language.image}
            onLearning={language.onLearnig}
          />
        )}
      </Grid>
      <Grid>
        <Typography  type="title">Доступные курсы</Typography>
      </Grid>
      <Grid container justify="flex-start" spacing={16}>
        {props.newCourses.map((language) => 
          <LanguagePaper 
            key={language.id}
            id={language.id}
            title={language.title}
            image={language.image}
            onLearning={language.onLearnig}
          />
        )}
      </Grid>
    </AppPageStructure>
  );
}
export default CoursesPage;