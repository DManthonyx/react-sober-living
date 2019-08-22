import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class LogIn extends Component {
  state = {
    password: '',
    email: '',
  }
  
  onInputChange = (e) => { this.setState({ [e.target.name]: e.target.value }) 
  };

  submitLogIn = async (e) => {
    e.preventDefault()
    const login = this.props.login(this.state)
    login.then((data) => {
      if(data.status.message === 'Success'){
        console.log(data, 'this is login data')
        this.props.history.push('/account')
      } else {
        console.log(data, this.props)
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  render () {
   const { password, user_type, email } = this.state
   console.log(this.state, 'this is login')
    return (
      <div>
        <form onSubmit={this.submitLogIn}>
          <label>Email:</label>
            <input type="email" name="email" value={email} onChange={this.onInputChange} />
          <label>Password:</label>
            <input type="password" name="password" value={password} onChange={this.onInputChange} />
          <button>Log In</button>
        </form>
      </div>
    )
  }
}

export default LogIn