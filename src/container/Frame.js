import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {green900} from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import Header from '../component/Header';

const muiTheme = getMuiTheme({
  appBar: {
    color: green900,
  },
  textField: {
    focusColor: green900,
  },
});

export default class Frame extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={{height: '100vh', width: '100vw'}}>
          <Header />
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}
