import React, { useState, Component } from 'react'
import { Link } from 'react-router-dom';

class SignUp extends Component {
  state = {
    name: '',
    last_name: '',
    password: '',
    re_password: '',
    user_type: '',
    age: 0,
    phone_number: '',
    email: '',
    ethnicity: '',
    gender: '',
    
  }
  
  onInputChange = (e) => { this.setState({ [e.target.name]: e.target.value }) 
  };

  submit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('name', this.state.name);
    data.append('last_name', this.state.last_name);
    data.append('password', this.state.password);
    data.append('re_password', this.state.re_password);
    data.append('user_type', this.state.user_type);
    data.append('age', this.state.age);
    data.append('phone_number', this.state.phone_number);
    data.append('email', this.state.email);
    data.append('ethnicity', this.state.ethnicity);
    data.append('gender', this.state.gender);

    const registerCall = this.props.register(data);

    registerCall.then((data) => {
      console.log(data, 'this is data')
        if(data.status.message === "Success"){
          this.props.history.push(`/account/${data.data.id}`)
        } else {
          console.log(data, ' this should have an error message? How could you display that on the screen')
        }
    })
    console.log(this.state)
  }

  checkform = () => {
    const name = document.querySelector('name').value
  }
  
  render () {
    return (
      <div>
        <h1>SignUp</h1>
        <form onSubmit={this.submit}>
          <input className="name" type="text" placeholder="first name" name="name" onChange={this.onInputChange} />
          <input className="last_name" type="text" placeholder="last name" name="last_name" onChange={this.onInputChange} />
          <input className="password" type="password" placeholder="password" name="password" onChange={this.onInputChange} />
          <input className="re_password" type="password" placeholder="re-password" name="re_password" onChange={this.onInputChange} />
          <select className="user_type" name="user_type" onChange={this.onInputChange}>
            <option>user type</option>
            <option>business</option>
            <option>client</option>
            <option>admin</option>
          </select>
          <input className="age" type="number" name="age" placeholder="age" onChange={this.onInputChange} />
          <input className="phone_number" type="text" name="phone_number" placeholder="phone number" onChange={this.onInputChange} />
          <input className="email" type="email" name="email" placeholder="email" onChange={this.onInputChange} />
          <input className="ethnicity" type="text" name="ethnicity" placeholder="ethnicity" onChange={this.onInputChange} />
          <select className="gender" name ="gender" onChange={this.onInputChange}>
            <option>gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>
          <button>SIGN UP</button>
        </form>
      </div>
    )
  }
}

export default SignUp