import React, {Component} from 'react';
import moment from 'moment';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import Panel from '../component/Panel';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      generated: '',
      list: [],
      open: false,
      textField: {
        min: {
          errorText: '',
          valid: true,
          value: 0,
        },
        max: {
          errorText: '',
          valid: true,
          value: 1,
        }
      },
      timestamp: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSnackbar = this.handleSnackbar.bind(this);
  }

  errorCheck(input, key) {
    let copy = Object.assign({}, this.state);
    if (input === '') {
      copy.textField[key].errorText = 'This field is required.';
      copy.textField[key].valid = false;
    } else if (isNaN(input)) {
      copy.textField[key].errorText = 'This field requires a number.';
      copy.textField[key].valid = false;
    } else {
      copy.textField[key].value = parseInt(input, 10);
      copy.textField[key].errorText = '';
      copy.textField[key].valid = true;
    }
    return copy;
  }

  handleChange(event) {
    this.setState(this.errorCheck(event.target.value, event.target.id));
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.textField['min'].valid && this.state.textField['max'].valid) {
      this.setState({
        count: this.state.count + 1,
        generated: Math.floor(Math.random() * (this.state.textField['max'].value - this.state.textField['min'].value + 1)) + this.state.textField['min'].value,
        timestamp: moment().format(),
      },
      () => {
        const entry = [
          <TableRow>
            <TableRowColumn>{this.state.count}</TableRowColumn>
            <TableRowColumn>{this.state.generated}</TableRowColumn>
            <TableRowColumn>{this.state.timestamp}</TableRowColumn>
            <TableRowColumn>{this.state.textField['min'].value}</TableRowColumn>
            <TableRowColumn>{this.state.textField['max'].value}</TableRowColumn>
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
            floatingLabelText="Minimum"
            id="min"
            onChange={this.handleChange}
          />
          <TextField
            defaultValue={this.state.textField['max'].value}
            errorText={this.state.textField['max'].errorText}
            floatingLabelText="Maximum"
            id="max"
            onChange={this.handleChange}
          /><br />
          <RaisedButton
            label="Generate"
            onTouchTap={this.handleSubmit}
          />
        </Panel>
        <Panel>
          <Table fixedHeader={true} height={'40vh'}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>#</TableHeaderColumn>
                <TableHeaderColumn>Generated</TableHeaderColumn>
                <TableHeaderColumn>Timestamp</TableHeaderColumn>
                <TableHeaderColumn>Minimum</TableHeaderColumn>
                <TableHeaderColumn>Maximum</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} showRowHover={true}>
              {this.state.list}
            </TableBody>
          </Table>
        </Panel>
        <Snackbar
          open={this.state.open}
          message="Please correctly fill in the fields."
          autoHideDuration={3000}
          onRequestClose={this.handleSnackbar}
        />
      </div>
    );
  }
}
