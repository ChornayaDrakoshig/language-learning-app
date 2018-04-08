import React from 'react';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { InputAdornment } from 'material-ui/Input';
import TextField from 'material-ui/TextField';

import Search from 'material-ui-icons/Search';
//import AccountCircle from '@material-ui/icons/AccountCircle';

class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    return (
      <React.Fragment>
      <Grid item xs={8}>
        <TextField
        id="input-with-icon-textfield"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />
        </Grid>
        <Grid item xs={2}>
        <FormControl >
          <Select
            native
            value={this.state.age}
            
          >
            <option value="">None</option>
            <option value={10}>Ten</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
          </Select>
          <FormHelperText>Without label</FormHelperText>
        </FormControl>
        </Grid>
      </React.Fragment>
    
  );
}
}

export default Filters;