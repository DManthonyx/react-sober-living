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

class SignUp extends Component {
  state = {
    name: '',
    last_name: '',
    password: '',
    re_password: '',
    user_type: 'business',
    phone_number: '',
    email: '',
    error: {
      name: '', 
      last_name: '',
      password: '',
      email: '',
    }
  }

  onInputChange = (e) => { this.setState({ [e.target.name]: e.target.value }) 
  };
  
  validate = () => {
    if(
      (this.state.name.length < 1) || 
      (this.state.last_name.length < 1)
      ) {
      this.setState({
        error: {
          name: 'please fill out name, last name!!!'
        }
      })
      return false
    }
    if(
      (this.state.password !== this.state.re_password) || 
      (this.state.password.length < 4) ||
      (this.state.password.search(/[a-z]/) === -1) ||
      (this.state.password.search(/[0-9]/) === -1) ||
      (this.state.password.search(/[A-Z]/) === -1 )
      ) {
      this.setState({
        error: {
          password: 'passwords must match,length of 5 with a upper/lower case letter!!!' 
        }
      })
      return false
    }
    if(
      (this.state.email.search(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/) === -1) ||
      (this.state.phone_number.length < 1)
      ) {
      this.setState({
        error: {
          email: 'email/phone number incorrect!!!'
        }
      })
      return false
    }

    return true
  };

  submit = async (e) => {
    e.preventDefault();

    const isValid = this.validate();
    if(isValid) {
    const data = new FormData();
    data.append('name', this.state.name);
    data.append('last_name', this.state.last_name);
    data.append('password', this.state.password);
    data.append('re_password', this.state.re_password);
    data.append('user_type', this.state.user_type);
    data.append('phone_number', this.state.phone_number);
    data.append('email', this.state.email);

    const registerCall = this.props.register(data);
    registerCall.then((data) => {
        if(data.status.message === "Success"){
          this.props.history.push(`/account/${data.data.id}`)
        } else {
          console.log(data, ' this should have an error message? How could you display that on the screen')
        }
    })
    }
  }
  
  render () {

    return (
      <Section>
        <H1>Create Account For your business</H1>
        <Form onSubmit={this.submit}>
          <InputDiv>
          <Input className="name" type="text" placeholder="first name" name="name" onChange={this.onInputChange} />
          <Input className="last_name" type="text" placeholder="last name" name="last_name" onChange={this.onInputChange} />
          </InputDiv>
          <SmallDiv>
            <Small>{this.state.error.name}</Small>
          </SmallDiv>
          <InputDiv>
          <Input className="password" type="password" placeholder="password" name="password" onChange={this.onInputChange} />
          <Input className="re_password" type="password" placeholder="re-password" name="re_password" onChange={this.onInputChange} />
          </InputDiv>
          <SmallDiv>
            <Small>{this.state.error.password}</Small>
          </SmallDiv>
          <InputDiv>
          <Input className="email" type="text" name="email" placeholder="email" onChange={this.onInputChange} />
          <Input className="phone_number" type="text" name="phone_number" placeholder="phone number" onChange={this.onInputChange} />
          </InputDiv>
          <SmallDiv>
            <Small>{this.state.error.email}</Small>
          </SmallDiv>
          <InputDiv>
          <Submit>SIGN UP</Submit>
          </InputDiv>
        </Form>
      </Section>
    )
  }
}

export default SignUp