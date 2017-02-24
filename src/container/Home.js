import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import moment from 'moment';

import Panel from '../component/Panel';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      generated: '',
      list: [],
      open: false,
      textField: {
        min: {
          errorText: '',
          value: 0,
        },
        max: {
          errorText: '',
          value: 1,
        },
      },
      timestamp: '',
      valid: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleGenerate = this.handleGenerate.bind(this);
    this.handleSnackbar = this.handleSnackbar.bind(this);
  }

  checkInput(input, key) {
    let copy = Object.assign({}, this.state);
    copy.textField[key].value = parseInt(input, 10);
    if (!isNaN(input)) {
      if (input !== '') {
        this.checkOtherInput(copy, key);
      } else {
        copy.textField[key].errorText = 'Required.';
        copy.valid = false;
      }
    } else {
      copy.textField[key].errorText = 'Number required.';
      copy.valid = false;
    }
    return copy;
  }

  checkOtherInput(copy, key) {
    const otherInput = copy.textField[this.getOtherKey(key)].value;
    if (!isNaN(otherInput)) {
      if (otherInput !== '') {
        if (copy.textField['min'].value < copy.textField['max'].value) {
          copy.textField['min'].errorText = '';
          copy.textField['max'].errorText = '';
          copy.valid = true;
        } else {
          copy.textField[key].errorText = key === 'min' ? 'Must be less than max.' : 'Must be greater than min.';
          copy.valid = false;
        }
      } else {
        copy.textField[key].errorText = '';
        copy.valid = false;
      }
    } else {
      copy.textField[key].errorText = '';
      copy.valid = false;
    }
  }

  getOtherKey(key) {
    return key === 'min' ? 'max' : 'min';
  }

  handleChange(event) {
    this.setState(this.checkInput(event.target.value, event.target.id));
  }

  handleGenerate(event) {
    if (this.state.valid) {
      this.setState({
        generated: Math.floor(Math.random() * (this.state.textField['max'].value - this.state.textField['min'].value + 1)) + this.state.textField['min'].value,
        timestamp: moment().format(),
      },
      () => {
        const entry = [
          <ListItem
            insetChildren={false}
            primaryText={'[' + this.state.textField['min'].value + ',' + this.state.textField['max'].value + ']: ' + this.state.generated}
            secondaryText={(this.state.list.length + 1) + ', ' + this.state.timestamp}
          />
        ];
        this.setState({
          list: entry.concat(this.state.list)
        });
      });
    } else {
      this.handleSnackbar();
    }
  }

  handleSnackbar() {
    this.setState({open: !this.state.open});
  }

  render() {
    return (
      <div>
        <Panel>
          <div style={{alignItems: 'center', display: 'flex', flexDirection: 'column',}}>
            <TextField
              defaultValue={this.state.textField['min'].value}
              errorText={this.state.textField['min'].errorText}
              floatingLabelText="min"
              id="min"
              onChange={this.handleChange}
            />
            <TextField
              defaultValue={this.state.textField['max'].value}
              errorText={this.state.textField['max'].errorText}
              floatingLabelText="max"
              id="max"
              onChange={this.handleChange}
            />
          </div>
          <br />
          <RaisedButton
            label="GENERATE"
            onTouchTap={this.handleGenerate}
          />
        </Panel>
        <Panel>
          <List style={{height: '40vh', overflowY: 'scroll'}}>
            {this.state.list}
          </List>
        </Panel>
        <Snackbar
          autoHideDuration={3000}
          message="Fill the fields correctly."
          onRequestClose={this.handleSnackbar}
          open={this.state.open}
        />
      </div>
    );
  }
}
