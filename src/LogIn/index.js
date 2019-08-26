import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import {
  Section,
  Form,
  Input,
  InputDiv,
  Submit,
  H1,
  Small,
  SmallDiv
} from './style'

class LogIn extends Component {
  state = {
    password: '',
    email: '',
    error: '',
  }
  
  onInputChange = (e) => { this.setState({ [e.target.name]: e.target.value }) 
  };

  validate = () => {
    console.log(this.state.email.search(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/), 'name search')
    if(
      (this.state.password.length < 4) ||
      (this.state.password.search(/[a-z]/) === -1) ||
      (this.state.password.search(/[0-9]/) === -1) ||
      (this.state.password.search(/[A-Z]/) === -1 ) || 
      (this.state.email.search(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/) === -1)
      ) {
      this.setState({
        error: 'password or email incorrect!!!'
      })
      return false
    }
    return true
  };

  submitLogIn = async (e) => {
    e.preventDefault()

    const isValid = this.validate();
    if(isValid) {
    const login = this.props.login(this.state)
    login.then((data) => {
      if(data.status.message === 'Success'){
        console.log(data, 'this is login data')
        this.props.history.push(`/account/${data.data.id}`)
      } else {
        console.log(data, this.props)
      }
    }).catch((err) => {
      console.log(err)
    })
    }
  }

  render () {
    return (
      <Section>
        <H1>Log In</H1>
        <Form onSubmit={this.submitLogIn}>
          <InputDiv>
            <Input type="text" name="email" value={this.state.email} placeholder="email" onChange={this.onInputChange} />
          </InputDiv>
          <InputDiv>
            <Input type="password" name="password" value={this.state.password} placeholder="password" onChange={this.onInputChange} />
          </InputDiv>
            <SmallDiv>
              <Small>{this.state.error}</Small>
            </SmallDiv>
          <Submit>Log In</Submit>
        </Form>
      </Section>
    )
  }
}

export default LogIn