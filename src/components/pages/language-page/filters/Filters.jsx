import React from 'react';
import Grid from 'material-ui/Grid';
import { FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Checkbox from 'material-ui/Checkbox';
import { InputAdornment } from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import Search from 'material-ui-icons/Search';
import { withStyles } from 'material-ui/styles';


const styles = theme => ({
  root: {
    width: '100%',
  },
  checkboxDefault: {
    color: theme.palette.secondary.main,
  },
  checkboxChecked: {
    color: theme.palette.secondary.main,
  },
});

class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
  }

  handleSearchChange(e) {
    this.props.setFilterText(e.target.value);
  }

  handleTagChange(e) {
    this.props.setFilterTag(Number(e.target.value));
  }

  renderSelectTagOptions() {
    return this.props.tagList.map((item) => (
      <option key={item.id} value={item.id}>{item.name}</option>
    ));
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Grid item xs={12}>
          <TextField
            id="input-with-icon-textfield"
            value={this.props.searchRow}
            onChange={this.handleSearchChange}
            className={classes.root}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl className={classes.root}>
            <Select
              native
              value={this.props.tag}
              onChange={this.handleTagChange}
            >
              <option value="0">Не выбрана</option>
              {this.renderSelectTagOptions()}
            </Select>
            <FormHelperText>Выбор категории</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.props.showOnLearning}
                onChange={() => this.props.setFilterOnLearning(!this.props.showOnLearning)}
                value="onLearning"
                classes={{
                  default: classes.checkboxDefault,
                  checked: classes.checkboxChecked,
                }}
              />
            }
            label="Изученные модули"
          />
        </Grid>
        <Grid item xs={3}>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.props.showNew}
                onChange={() => this.props.setFilterNew(!this.props.showNew)}
                value="newModules"
                classes={{
                  default: classes.checkboxDefault,
                  checked: classes.checkboxChecked,
                }}
              />
            }
            label="Новые модули"
          />
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Filters);