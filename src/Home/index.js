import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import {
  Section,
  DivImgBox,
  Img,
  Div,
  DivContent,
  H2,
  Button,
  Container
} from './style'

class Home extends Component {
  state = {
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

  goToLocations = () => {
    this.props.history.push('/locations')
  }

  render () {
    console.log("this is home ----------", this.state.homes)
  return (
    <Section>
      <Container>
      <DivImgBox>
        <Img src="https://i.imgur.com/8dHzvdg.jpg"/>
        <Div>
          <DivContent>
            <H2>West Covina, Ca</H2>
            <Button onClick={this.goToLocations}>More Info</Button>
          </DivContent>
        </Div>
      </DivImgBox>
      <DivImgBox>
        <Img src="https://i.imgur.com/J4rVNH5.jpg"/>
        <Div>
          <DivContent>
            <H2>Los, Angeles</H2>
            <Button onClick={this.goToLocations}>More Info</Button>
          </DivContent>
        </Div>
      </DivImgBox>
      </Container>
    </Section>
    )
  }
}

export default Home