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

  filter = e => {
    e.preventDefault()
    
    const value = document.querySelector('.filter').value
    this.props.history.push(`/locations/:${value}`)

  }

  render() {
    const { isOpen, setIsOpen } = this.state
    window.onresize = ()=> (window.innerWidth > 900 && isOpen) && setIsOpen(false)
    window.onClick = () => (setIsOpen(!isOpen))
    const isLoggedRoutes = ["home", "locations", "account"];
    const notLoggedRoutes = ["home", "locations", "signup", "login"];
    const { logged,id, logout } = this.props
  return (
    <NavContainer color={"white"}>
      <DivSearch>
        <SearchForm onSubmit={this.filter} >
          <Search className="filter" type="text" placeholder="Search for homes...."/>
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