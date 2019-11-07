import styled from 'styled-components'
import { Phone } from 'styled-icons/boxicons-regular/Phone'
import { Web } from 'styled-icons/material/Web'
import { Home } from 'styled-icons/fa-solid/Home'

export const PhoneNumber = styled(Phone)`
  width: 35px;  
`
export const Website = styled(Web)`
  width: 35px;  
`
export const House = styled(Home)`
  width: 35px;  
`

export const Container = styled.div`
  display: flex;
`
export const DivImg = styled.div`
  width: 60%;
`
export const ImgBig = styled.img`
  width: 100%;
  height: 350px;
`
export const ImgSmall = styled.img`
  width: 100px;
  height: 100px;
`
export const ImgMain = styled.div`
  padding: 10px;
`
export const ImgThumbnail = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 10px 10px
`
export const DivLocation = styled.div`
  width: 40%;
`
export const DivDetails = styled.div`
  font-family: 'Libre Caslon Display', serif;
`
export const DivOtherHomes = styled.div`
`
export const Title = styled.h1`
 font-size: 3em;
`
export const Desciption = styled.p`
  margin: 0 0 1em;
  line-height: 1.8em;
  font-size: 1.5em;
`
export const P = styled.p`
  font-size: 1.5em;
  margin-bottom: 1em;
`

export const WebsiteLink = styled.a`
  color: black;
  margin-bottom: 1em;
`