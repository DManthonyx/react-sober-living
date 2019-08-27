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
  color: #A8E0FF;
  padding: 7px 7px 0px;
  margin: 0px;
  position: relative;
  bottom: 34px;
  font-size: 4em;
  letter-spacing: 2px;
  font-family: 'Cinzel Decorative', cursive;
`

export const DivTitle = styled.div`
  width: 50%;
`
export const SubTitle = styled.small`
  padding: 7px 7px 0px;
  font-weight: bold;
  position: relative;
  bottom: 40px;
  font-size: 1.4em;
  letter-spacing: 3px;
`

export const Logout = styled(NavLink)`
padding: 0px 10px 10px 0px;
text-transform: uppercase;
color: black;
font-size: 15px;

`

export const LinkRoute = styled(NavLink)`
  display:inline-block;
  text-decoration: none;
  text-transform: uppercase;
  color: #2D3142;
  height: 29px;
  font-size: 1.1em;
  margin: 10px 11px 0px;
  &:hover {
    color: lightblue;
  }

  &.active{
    border-bottom: 1px solid black;
    color: #A8E0FF;
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

export const DivSearch = styled.div`
  text-align: right;
`

export const Search = styled.input`
text-align: center;
margin: 3px;
width: 26%;
border: 1px solid #A8E0FF;
border-radius: 3px;
height: 30px;
padding: 3px
`

export const SearchForm = styled.form`
`

export const SearchButton = styled.button`
  display: none;
`