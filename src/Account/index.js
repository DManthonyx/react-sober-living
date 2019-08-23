import React, { Component } from 'react';
import Admin from '../Admin'
import UserBusiness from '../UserBusiness'
import UserClient from '../UserClient'

class Account extends Component {
  render () {
    
    let account;
    if (this.props.user_type === 'admin') {
      account = <Admin />
    } else if(this.props.user_type === 'client') {
      account = <UserClient/>
    } else {
      account = <UserBusiness />
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