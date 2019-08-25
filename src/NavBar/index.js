import React, { useState } from 'react';
import Hamburger from '../Hamburger';
import {
  NavContainer,
  Nav,
  Overlay,
  OverlayContainer,
  Link
} from './style'

const NavBar = ({ logged,id, logout }) => {
  const isLoggedRoutes = ["home", "locations", "resources", "events", "account"]
  const notLoggedRoutes = ["home", "locations", "resources", "events", "signup", "login"]
  const [isOpen, setIsOpen ] = useState(false)
  window.onresize = ()=> (window.innerWidth > 900 && isOpen) && setIsOpen(false)
  
  return (
    <NavContainer color={"white"}>
      <Nav>
      {
        logged 
        ?
        <div>
        {
        isLoggedRoutes.map((route, i) =>
          route === "account" ?  <Link exact to={`/${route}/${id}`} key={i}>{route}</Link> :<Link exact to={`/${route}`} key={i}>{route}</Link>
          )
        }
          <h1 onClick={logout}>logout</h1>
        </div>
          :
        notLoggedRoutes.map((route, i) =>
          <Link exact to={`/${route}`} key={i}>{route}</Link>
        )
      }
      <Hamburger setIsOpen={setIsOpen} isOpen={isOpen} />
      </Nav>
      <OverlayContainer className={isOpen ? "show" : "hide"}>
      <Overlay>
        {
          logged 
          ?
          isLoggedRoutes.map((route, i) =>
            <Link exact to={`/${route}`} key={i}>{route}</Link>
          )
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