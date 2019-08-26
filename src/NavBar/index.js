import React,  { Component } from 'react';
import Hamburger from '../Hamburger';
import { Link } from 'react-router-dom';
import {
  NavContainer,
  Nav,
  Title,
  DivTitle,
  SubTitle,
  Overlay,
  OverlayContainer,
  LinkRoute,
  Div,
  Logout,
  DivSearch,
  Search,
  SearchForm,
  SearchButton
} from './style'

class NavBar extends Component {
  state = {
    isOpen: false,
    setIsOpen: false,
    homes: [],
    resources: [],
    events: [],

  }

  async componentDidMount () {
    this.getHomes()
    this.getEvents()
    this.getResources()
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

  getEvents = async () => {
    try {
      const getEvents = await fetch(`${process.env.REACT_APP_BACKEND_URL}/event/`, {
        method: 'GET',
        credentials: 'include',// on every request we have to send the cookie
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if(getEvents.ok) {
        const responseParsed = await getEvents.json()
        this.setState({
          events: responseParsed.data
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  getResources = async () => {
    try {
      const getResources = await fetch(`${process.env.REACT_APP_BACKEND_URL}/resource/`, {
        method: 'GET',
        credentials: 'include',// on every request we have to send the cookie
        headers: {
          'Content-Type': 'application/json'
      }
      })
      if(getResources.ok) {
        const responseParsed = await getResources.json()
        this.setState({
          resources: responseParsed.data
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
  filter = e => {
    e.preventDefault()
    
    const value = document.querySelector('.filter').value
    this.props.history.push(`/locations/:${value}`)

  }

  render() {
    const { isOpen, setIsOpen } = this.state
    window.onresize = ()=> (window.innerWidth > 900 && isOpen) && setIsOpen(false)
    window.onClick = () => (setIsOpen(!isOpen))
    const isLoggedRoutes = ["home", "locations", "resources", "events", "account"];
    const notLoggedRoutes = ["home", "locations", "resources", "events", "signup", "login"];
    const { logged,id, logout } = this.props
  return (
    <NavContainer color={"white"}>
      <DivSearch>
        <SearchForm onSubmit={this.filter} >
          <Search className="filter" type="text" placeholder="Search for homes, resources, events"/>
          <SearchButton></SearchButton>
        </SearchForm>
      </DivSearch>
      <Nav>
        <DivTitle>
          <Title>SoberLiving</Title>
          <SubTitle>GOD grant me the serenity</SubTitle>
        </DivTitle>
      {
        logged 
        ?
        <Div>
        {
        isLoggedRoutes.map((route, i) =>
          route === "account" ?  <LinkRoute exact to={`/${route}/${id}`} key={i}>{route}</LinkRoute> :<LinkRoute exact to={`/${route}`} key={i}>{route}</LinkRoute>
          )
        }
          <Logout onClick={logout}>logout</Logout>
        </Div>
          :
        <Div>
        {
        notLoggedRoutes.map((route, i) =>
          <LinkRoute exact to={`/${route}`} key={i}>{route}</LinkRoute>
        )
        }
        </Div>
      }
      <Hamburger setIsOpen={setIsOpen} isOpen={isOpen} />
      </Nav>
      <OverlayContainer className={isOpen ? "show" : "hide"}>
      <Overlay>
      {
        logged 
        ?
        <Div>
        {
        isLoggedRoutes.map((route, i) =>
          route === "account" ?  <LinkRoute exact to={`/${route}/${id}`} key={i}>{route}</LinkRoute> :<LinkRoute exact to={`/${route}`} key={i}>{route}</LinkRoute>
          )
        }
          <Logout onClick={logout}>logout</Logout>
        </Div>
          :
        notLoggedRoutes.map((route, i) =>
          <LinkRoute exact to={`/${route}`} key={i}>{route}</LinkRoute>
        )
      }
      </Overlay>
      </OverlayContainer>
    </NavContainer>
  )
    }
}

export default NavBar