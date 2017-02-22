import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
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
        }
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
    copy.valid = !isNaN(input) && input !== '';
    if (copy.valid) {
      copy.textField[key].value = parseInt(input, 10);
      this.checkMinMax(copy, key);
    } else {
      copy.textField[key].errorText = input === '' ? 'Required.' : 'Number required.';
    }
    return copy;
  }

  checkMinMax(copy, key) {
    copy.valid = copy.textField['min'].value < copy.textField['max'].value;
    if (copy.valid) {
      copy.textField['min'].errorText = copy.textField['max'].errorText = '';
    } else {
      copy.textField[key].errorText = key === 'min' ? 'Must be less than max.' : 'Must be greater than min.';
    }
  }

  handleChange(event) {
    this.setState(this.checkInput(event.target.value, event.target.id));
  }

  handleGenerate(event) {
    event.preventDefault();
    if (this.state.valid) {
      this.setState({
        generated: Math.floor(Math.random() * (this.state.textField['max'].value - this.state.textField['min'].value + 1)) + this.state.textField['min'].value,
        timestamp: moment().format(),
      },
      () => {
        const entry = [
          <TableRow>
            <TableRowColumn style={{width: '5px'}}>{this.state.list.length + 1}</TableRowColumn>
            <TableRowColumn>{this.state.generated}</TableRowColumn>
            <TableRowColumn>[{this.state.textField['min'].value}, {this.state.textField['max'].value}]</TableRowColumn>
            <TableRowColumn>{this.state.timestamp}</TableRowColumn>
          </TableRow>
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
          /><br />
          <RaisedButton
            label="Generate"
            onTouchTap={this.handleGenerate}
          />
        </Panel>
        <Panel>
          <Table bodyStyle={{overflow: 'visible'}} height={'40vh'}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn style={{width: '5px'}}>#</TableHeaderColumn>
                <TableHeaderColumn>Generated</TableHeaderColumn>
                <TableHeaderColumn>[Min, Max]</TableHeaderColumn>
                <TableHeaderColumn>Timestamp</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} showRowHover={true}>
              {this.state.list}
            </TableBody>
          </Table>
        </Panel>
        <Snackbar
          open={this.state.open}
          message="Fill the fields correctly."
          autoHideDuration={3000}
          onRequestClose={this.handleSnackbar}
        />
      </div>
    );
  }
}
