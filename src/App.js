import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import SignUp from './SignUp';
import Locations from './Locations';
import LogIn from './LogIn';
import Account from './Account'

const My404 = () => {
  return (
    <div>
      <Redirect to='/home' />
    </div>
  )
};


class App extends Component {

  state = {
    name: '',
    id:'',
    user_type: '',
    loading: false,
    isLogged: false,
    homes: []
  }

  async componentDidMount () {
    this.getHomes()
  }

  getHomes = async () => {
    try {
      const getHomes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/locations/`, {
        method: 'GET',
        credentials: 'include',// on every request we have to send the cookie
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if(getHomes.ok) {
        const responseParsed = await getHomes.json()
        this.setState({
          homes: responseParsed.data
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  register = async (data) => {
    try {
      const registerResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/signup`, {
        method: 'POST',
        credentials: 'include',
        body: data,
        headers: {
        'enctype': 'multipart/form-data'
      }
     })
      const parsedResponse = await registerResponse.json();
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
      const loginResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/login`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(loginInfo),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const parsedResponse = await loginResponse.json();
      if (parsedResponse.status.message !== "Username or Password is incorrect"){
        this.setState(() => {
          return {
            ...parsedResponse.data,
            id: parsedResponse.data.id,
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
      const loginResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/logout`, {
        method: 'GET',
        credentials: 'include',
      })
      this.setState({
        isLogged: false,
        user_type: '',
        name: '',
        id: ''
      })
      this.props.history.push('/home')

    } catch(err) {
      console.log(err)
    }
  }

  render () {
    return (
      <div>
        <NavBar logged={this.state.isLogged} id={this.state.id} logout={this.logout} homes={this.state.homes}/>
        <Switch>
          <Route exact path='/' render={(props) =>  <Home {...props} logout={this.logout}/>} />
          <Route exact path='/home' render={(props) =>  <Home {...props} logout={this.logout}/>} />
          <Route exact path='/locations' render={(props) =>  <Locations {...props} homes={this.state.homes} />} />
          {
            this.state.isLogged
            ?
            <Route exact path='/account/:id' render={(props) =>  <Account {...props} name={this.state.name} user_type={this.state.user_type} homes={this.state.homes}/>} /> 
            :
            <Route exact path='/home' render={(props) =>  <Home {...props} logout={this.logout}/>} />
          }
          <Route exact path='/signup' render={(props) =>  <SignUp {...props} register={this.register} />} />         
          <Route exact path='/login' render={(props) =>  <LogIn {...props} login={this.login} />} />
          <Route component={ My404 } />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
