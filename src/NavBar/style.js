import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const NavContainer = styled.div`
  background-color: ${props => props.color ? props.color : "black"};
`

export const Nav = styled.div`
  
  @media (max-width: 950px) {
    a {
      display:none;
    }
  }
`

export const Link = styled(NavLink)`
  display:inline-block;
  text-decoration: none;
  padding: 15px;
  text-transform: uppercase;
  color: black;
  &:hover {
    color: lightblue;
  }

  &.active{
    border-bottom: 1px solid black;
  }
  
  .show > &.active {
    border-bottom: none;
    color: gold;
  }
`

export const OverlayContainer = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  left: -120rem;
  transition: left .75s ease-in-out;
  display: flex;
  flex-direction: column;
  &.show {
    left: 0;
  }
`

export const Overlay = styled.div`
  background-color: rgba(0,0,0, 0.7);
  display: flex;
  flex-direction: column;
  & > a {
    color: white;
  }
`