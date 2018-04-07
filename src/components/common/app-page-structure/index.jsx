import React from 'react';
import Header from 'components/containers/header';
import Grid from 'material-ui/Grid';

function AppPageStructure(props) {
  return (
    <React.Fragment>
      <Header />
      <Grid container justify="center" spacing={0} >
        <Grid item xs={12} sm={10} md={8} lg={7} xl={6}>
          {props.children}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
export default AppPageStructure;