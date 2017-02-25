import React, {Component} from 'react';
import Paper from 'material-ui/Paper';

const style = {
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '8px',
    marginRight: '8px',
    marginTop: '8px',
    padding: '8px',
    width: '400px',
  },
};

export default class Panel extends Component {
  render() {
    return (
      <div style={style.container}>
        <Paper style={style.paper} zDepth={1}>
          {this.props.children}
        </Paper>
      </div>
    );
  }
}
