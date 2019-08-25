import React, { Component } from 'react';
import Admin from '../Admin'
import UserBusiness from '../UserBusiness'
import UserClient from '../UserClient'

class Account extends Component {
  
  render () {
    const { id } = this.props.match.params
    let account;
    if (this.props.user_type === 'admin') {
      account = <Admin id={id} {...this.props}/>
    } else if(this.props.user_type === 'client') {
      account = <UserClient id={id}/>
    } else {
      account = <UserBusiness id={id}/>
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