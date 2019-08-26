import React from 'react'

import {
  HamburgerContainer,
  HamburgerBar,
} from './style'

const Hamburger  = ({isOpen, setIsOpen}) => {

  return (
    <HamburgerContainer className={isOpen ? "open" : "closed"} onClick={() => setIsOpen(!isOpen)}>
      <HamburgerBar></HamburgerBar>
      <HamburgerBar></HamburgerBar>
      <HamburgerBar></HamburgerBar>
    </HamburgerContainer>
  )
}

export default Hamburger