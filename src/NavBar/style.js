import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const NavContainer = styled.div`
  background-color: ${props => props.color ? props.color : "black"};
  font-family: 'Libre Caslon Display', serif;

`

export const Nav = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
  @media (max-width: 950px) {
    a {
      display:none;
    }
  }
`

export const Title = styled.h1`
  width: 50%;
  padding: 3px 7px;
  font-size: 3em;
  letter-spacing: 2px;
  font-family: 'Cinzel Decorative', cursive;
`

export const Logout = styled(NavLink)`
padding: 0px 10px 10px 0px;
text-transform: uppercase;
color: black;
font-size: 15px;

`

export const Link = styled(NavLink)`
  display:inline-block;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
  height: 29px;
  margin: 20px 11px 0px;
  &:hover {
    color: lightblue;
  }

  &.active{
    border-bottom: 1px solid black;
    color: gray;
    font-weight: bold;
    height: 29px;
    position: relative;
    transform: scale(1.3);
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

export const Div = styled.div`
  width: 50%;
  text-align: right;
`