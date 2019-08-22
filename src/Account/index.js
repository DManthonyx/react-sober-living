import React, { Component } from 'react';
import Admin from '../Admin'
import Business from '../Business'
import Client from '../Client'

class Account extends Component {
  render () {
    
    let account;
    if (this.props.user_type === 'admin') {
      account = <Admin />
    } else if(this.props.user_type === 'client') {
      account = <Client />
    } else {
      account = <Business />
    }
    console.log(this.props.user_type, 'this is account ')
    return (
      <div>
        {account}
      </div>
    )
  }
}

export default Account