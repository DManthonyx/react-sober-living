import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import SignUp from './SignUp';
import Locations from './Locations';
import LogIn from './LogIn';
import Account from './Account'
import ViewHome from './ViewHome'

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
    userLocation: { 
      lat: null,
      lng: null
    }, 
    loading: false,
    isLogged: false,
    homes: []
  }

  async componentDidMount () {
    // console.log(this.state,'this is bars component did mount');
    await navigator.geolocation.getCurrentPosition(position => {
      console.log(position, 'this is position')
      const {latitude, longitude} = position.coords;
      this.setState({
        userLocation: { lat: latitude, lng: longitude },
      });
    })
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

  viewHome = (id) => {
    this.props.history.push(`/locations/${id}`)
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
      const loginResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/login`, {
        method: 'POST',
        credentials: 'include',
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
    console.log(this.state.userLocation, 'this is user location')
    return (
      <div>
        <NavBar  props={this.props} logged={this.state.isLogged} id={this.state.id} logout={this.logout} homes={this.state.homes}/>
        <Switch>
          <Route exact path='/' render={(props) =>  <Home {...props} logout={this.logout}/>} />
          <Route exact path='/home' render={(props) =>  <Home {...props} logout={this.logout}/>} />
          <Route exact path='/locations' render={(props) =>  <Locations {...props} homes={this.state.homes} viewHome={this.viewHome} cordinates={this.state.userLocation} />} />
          {/* {
            this.state.isLogged
            ?
            <Route exact path='/account/:id' render={(props) =>  <Account {...props} homes={this.state.homes} name={this.state.name} user_type={this.state.user_type}/>} /> 
            :
            <Route exact path='/home' render={(props) =>  <Home {...props} logout={this.logout}/>} />
          } */}
          <Route exact path='/account/:id' render={(props) =>  <Account {...props} homes={this.state.homes} name={this.state.name} user_type={this.state.user_type}/>} />
          <Route exact path='/home' render={(props) =>  <Home {...props} logout={this.logout}/>} />
          <Route exact path='/signup' render={(props) =>  <SignUp {...props} register={this.register} />} />         
          <Route exact path='/login' render={(props) =>  <LogIn {...props} login={this.login} />} />
          <Route exact path='/locations/:id' render={(props) => <ViewHome {...props} />} />
          <Route component={ My404 } />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
