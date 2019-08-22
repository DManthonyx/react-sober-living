import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import SignUp from './SignUp';
import Resources from './Resources';
import Events from './Events';
import Locations from './Locations';
import LogIn from './LogIn';
import Account from './Account';

class App extends Component {

  state = {
    name: '',
    user_type: '',
    loading: false,
    homes: [],
    isLogged: false
  }

  async componentDidMount() {
    console.log('component mount');
    
    this.setState({
      
    })
  };

  register = async (data) => {
    try {
      const registerResponse = await fetch('http://localhost:8000/user/signup', {
        method: 'POST',
        credentials: 'include',
        body: data,
        headers: {
        'enctype': 'multipart/form-data'
      }
     })
      const parsedResponse = await registerResponse.json();
      console.log(parsedResponse)
      this.setState({
       ...parsedResponse.data,
       loading: false,
       isLogged: !this.state.isLogged
      })
     return parsedResponse;
    } catch (err) {
     console.log(err)
    };
  };

  login = async (loginInfo) => {
    try {
      const loginResponse = await fetch('http://localhost:8000/user/login', {
        method: 'POST',
        credentials: 'include',// on every request we have to send the cookie
        body: JSON.stringify(loginInfo),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const parsedResponse = await loginResponse.json();
      console.log(parsedResponse)
      if (parsedResponse.status.message !== "Username or Password is incorrect"){
        this.setState(() => {
          return {
            ...parsedResponse.data,
            loading: false,
            isLogged: true
          }
        })
      }
      return parsedResponse
    } catch (err) {
      console.log(err)
    }
  }

  logout = async () => {
    try {
      const loginResponse = await fetch('http://localhost:8000/user/logout', {
        method: 'GET',
        credentials: 'include',
      })
      this.setState({
        isLogged: false,
        user_type: '',
        name: ''
      })
    } catch(err) {
      console.log(err)
    }
  }

  // getAllHomes = async () => {
  //   try {
  //     const loginResponse = await fetch('http://localhost:8000/user/logout', {
  //       method: 'GET',
  //       credentials: 'include',
  //     })
  //   } catch(err) {
  //     console.log(err)
  //   }
  // }

  render () {
    console.log(this.state, 'this is state')
    return (
      <div>
        <NavBar logged={this.state.isLogged}/>
        <Switch>
          <Route exact path='/home' render={(props) =>  <Home {...props} logout={this.logout}/>} />
          <Route exact path='/locations' render={(props) =>  <Locations {...props} />} />
          <Route exact path='/resources' render={(props) =>  <Resources {...props} />} />
          <Route exact path='/events' render={(props) =>  <Events {...props} />} /> 
          <Route exact path='/account' render={(props) =>  <Account {...props} user_type={this.state.user_type}/>} /> 
          <Route exact path='/signup' render={(props) =>  <SignUp {...props} register={this.register} />} />         
          <Route exact path='/login' render={(props) =>  <LogIn {...props} login={this.login} />} />
        </Switch>
      </div>
    );
  }
}

export default App;
