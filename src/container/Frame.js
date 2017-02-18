import React, {Component} from 'react';

import AppHeader from '../component/AppHeader';

export default class Frame extends Component {
  render() {
    return (
      <div>
        <AppHeader />
        {this.props.children}
      </div>
    );
  }
}
