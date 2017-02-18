import React from 'react';
import ReactDOM from 'react-dom';
import {IndexRoute, Route, Router, browserHistory} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import Error from './container/Error';
import Frame from './container/Frame';
import Home from './container/Home';
import './index.css';

ReactDOM.render(
  <MuiThemeProvider>
    <Router history={browserHistory}>
      <Route path="/" component={Frame}>
        <IndexRoute component={Home} />
        <Route path="*" component={Error} />
      </Route>
    </Router>
  </MuiThemeProvider>,
  document.getElementById('root')
);
