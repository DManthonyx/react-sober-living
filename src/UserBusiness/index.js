import React, { Component } from 'react';

class UserBusiness extends Component {
  state = {
    homes:  []
  }
  async componentDidMount () {
    this.getHomes()
  }
  render () {


  return (
    <div>
      Business
    </div>
  )
  }
}

export default UserBusiness