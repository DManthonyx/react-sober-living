import React,  { Component } from 'react';
import Hamburger from '../Hamburger';
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
  AutoComplete,
  SearchLink
} from './style'

class NavBar extends Component {
  state = {
    isOpen: false,
    setIsOpen: false,
    searchDisplay: '',
    searchHomes: ''
  }

  onInputChange = (e) => { 
    this.setState({ 
      [e.target.name]: e.target.value,
      searchDisplay: 'block',
    })
  }

  displayBlock = () => {
    this.setState({
      searchDisplay: 'block'
    })
  }

  filterHomes = (e) => {
    const array = []
    const homes = this.props.homes
    const searchHomes = this.state.searchHomes
    // const autoComplete = document.querySelector(".autocomplete");

    // if input value exists, repopulate the autocomplete list
    if(searchHomes){
      for(let i = 0; i < homes.length; i++){
        if(homes[i].title.toUpperCase().includes(searchHomes.toUpperCase())){
          array.push(homes[i])
        }
      }
    }
    return array
  }

  removeList = () => {
    this.setState({
      searchDisplay: 'none'
    })
  }

  render() {
    const { isOpen, setIsOpen } = this.state
    window.onresize = ()=> (window.innerWidth > 900 && isOpen) && setIsOpen(false)
    window.onClick = () => (setIsOpen(!isOpen))
    const isLoggedRoutes = ["home", "locations", "account"];
    const notLoggedRoutes = ["home", "locations", "login"];
    const { logged,id, logout } = this.props
  return (
    <NavContainer color={"white"} onClick={this.removeList}>
      <DivSearch>
        <Search className="filter" type="text" placeholder="Search for homes...." name="searchHomes" value={this.state.searchHomes} onChange={this.onInputChange} onClick={() => this.displayBlock()}/>
        <AutoComplete display={this.state.searchDisplay} className="autocomplete">
          {this.filterHomes().map((home,i)=>{
            return (
                <SearchLink exact to={`/locations/${home.id}`} key={i}>{`${home.title}`}</SearchLink>
            )
          })}
        </AutoComplete>
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