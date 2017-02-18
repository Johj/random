import React, {Component} from 'react';

import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

export default class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
    this.handleDialog = this.handleDialog.bind(this);
  }

  handleDialog() {
    this.setState({open: !this.state.open});
  }

  render() {
    const aboutButton = (
      <FlatButton label="About" onTouchTap={this.handleDialog} />
    );

    const closeButton = (
      <FlatButton label="Close" onTouchTap={this.handleDialog} />
    );

    return (
      <div>
        <AppBar
          iconElementRight={aboutButton}
          showMenuIconButton={false}
          title="Random"
        />
        <Dialog
          actions={closeButton}
          autoScrollBodyContent={true}
          onRequestClose={this.handleDialog}
          open={this.state.open}
          title="About"
        >
          <List>
            <Subheader>GitHub</Subheader>
            <ListItem
              href="https://github.com/Johj/random"
              primaryText="Random"
              secondaryText="by Peter Han"
              target="_blank"
            />
          </List>
          <Divider />
          <List>
            <Subheader>Dependencies</Subheader>
            <ListItem
              href="https://github.com/callemall/material-ui"
              primaryText="material-ui"
              secondaryText="0.17.0"
              target="_blank"
            />
            <ListItem
              href="https://github.com/moment/moment/"
              primaryText="moment"
              secondaryText="2.17.1"
              target="_blank"
            />
            <ListItem
              href="https://github.com/facebook/react"
              primaryText="react"
              secondaryText="15.4.2"
              target="_blank"
            />
            <ListItem
              href="https://github.com/facebook/react/tree/master/packages/react-dom"
              primaryText="react-dom"
              secondaryText="15.4.2"
              target="_blank"
            />
            <ListItem
              href="https://github.com/ReactTraining/react-router"
              primaryText="react-router"
              secondaryText="3.0.2"
              target="_blank"
            />
            <ListItem
              href="https://github.com/zilverline/react-tap-event-plugin"
              primaryText="react-tap-event-plugin"
              secondaryText="2.0.1"
              target="_blank"
            />
          </List>
        </Dialog>
      </div>
    );
  }
}
