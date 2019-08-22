import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class Home extends Component {

  render () {
  return (
    <div>
      here
      <button onClick={this.props.logout}></button>
    </div>
    )
  }
}

export default Home