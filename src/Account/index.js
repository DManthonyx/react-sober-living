import React, { Component } from 'react';
import Admin from '../Admin'
import UserBusiness from '../UserBusiness'


class Account extends Component {
  
  render () {
    const { id } = this.props.match.params
    let account;
    if (this.props.user_type === 'admin') {
      account = <Admin id={id} {...this.props} homes={this.props.homes}/>
    }  else {
      account = <UserBusiness id={id} {...this.props}/>
    }
    return (
      <div>
        {account}
      </div>
    )
  }
}

export default Account