import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import {
  Container,
  DivImg,
  ImgBig,
  ImgSmall,
  ImgMain,
  ImgThumbnail,
  DivLocation,
  DivDetails,
  DivOtherHomes,
  Title,
  Desciption,
  P,
  PhoneNumber,
  Website,
  WebsiteLink,
  House
} from './style.js'

class ViewHome extends Component {

  state = {
    home: {},
    mainImg:  null,
    images: [],
    currentImg: 'https://i.imgur.com/UZldlfV.jpg'
  }

  componentDidMount() {
    this.getHome()
  }

  getHome = async () => {
    try {
      const getHomes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/locations/${this.props.match.params.id}`, {
        method: 'GET',
        credentials: 'include',// on every request we have to send the cookie
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if(getHomes.ok) {
        const responseParsed = await getHomes.json()
        this.setState({
          home: responseParsed.data,
          img: responseParsed.data.image_1
        })
        console.log(responseParsed, 'this is response parsed')
      }
    } catch (err) {
      console.log(err)
    }
  }

  changeImg = (e) => {
    if(e.target.src) {
      this.setState({
        currentImg: e.target.src,
      })
    }
    console.log(e.target.src, 'this is change image')
  }

  render() {
    console.log(this.state, 'this is from view home')
    return (
      <Container>
        <DivImg>
          <ImgMain>
            <ImgBig src={this.state.currentImg}/>
          </ImgMain> 
          <ImgThumbnail onClick={(e) => this.changeImg(e)}>
            <ImgSmall src="https://i.imgur.com/Px8vADh.jpg" />
            <ImgSmall src="https://i.imgur.com/MtXnrxv.jpg" />
            <ImgSmall src="https://i.imgur.com/AnaxO4T.jpg" />
            <ImgSmall src="https://i.imgur.com/00KwtBV.jpg" />
            <ImgSmall src="https://i.imgur.com/zVUvwjF.jpg" />
          </ImgThumbnail>
        </DivImg>
        <DivLocation>
          <DivDetails>
            <Title>{this.state.home.title}</Title>
            <Desciption>{this.state.home.description}</Desciption>
            <P><PhoneNumber />: {this.state.home.phone_number}</P>
            <P><WebsiteLink href={this.state.home.link} target="_blank"><Website />: {this.state.home.link}</WebsiteLink></P>
            <P><House />: {this.state.home.address} {this.state.home.city}</P>
          </DivDetails>
          <DivOtherHomes>

          </DivOtherHomes>
        </DivLocation>
      </Container>
    )
  }
}

export default withRouter(ViewHome)