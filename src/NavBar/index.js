import React, { useState } from 'react';
import Hamburger from '../Hamburger';
import {
  NavContainer,
  Nav,
  Title,
  DivTitle,
  SubTitle,
  Overlay,
  OverlayContainer,
  Link,
  Div,
  Logout,
  DivSearch,
  Search
} from './style'

const NavBar = ({ logged,id, logout }) => {
  const isLoggedRoutes = ["home", "locations", "resources", "events", "account"]
  const notLoggedRoutes = ["home", "locations", "resources", "events", "signup", "login"]
  const [isOpen, setIsOpen ] = useState(false)
  window.onresize = ()=> (window.innerWidth > 900 && isOpen) && setIsOpen(false)
  window.onClick = () => (setIsOpen(!isOpen))
  
  return (
    <NavContainer color={"white"}>
      <DivSearch>
        <Search  type="text" placeholder="Search for homes, resources, events"/>
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
          route === "account" ?  <Link exact to={`/${route}/${id}`} key={i}>{route}</Link> :<Link exact to={`/${route}`} key={i}>{route}</Link>
          )
        }
          <Logout onClick={logout}>logout</Logout>
        </Div>
          :
        <Div>
        {
        notLoggedRoutes.map((route, i) =>
          <Link exact to={`/${route}`} key={i}>{route}</Link>
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
          route === "account" ?  <Link exact to={`/${route}/${id}`} key={i}>{route}</Link> :<Link exact to={`/${route}`} key={i}>{route}</Link>
          )
        }
          <Logout onClick={logout}>logout</Logout>
        </Div>
          :
        notLoggedRoutes.map((route, i) =>
          <Link exact to={`/${route}`} key={i}>{route}</Link>
        )
      }
      </Overlay>
      </OverlayContainer>
    </NavContainer>
  )
}

export default NavBar