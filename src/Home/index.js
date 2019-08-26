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
    resources: [],
    events: [],

  }

  async componentDidMount () {
    this.getHomes()
    this.getEvents()
    this.getResources()
  }

  getHomes = async () => {
    try {
      const getHomes = await fetch(`http://localhost:8000/home/`, {
        method: 'GET',
        credentials: 'include',// on every request we have to send the cookie
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if(getHomes.ok) {
        const responseParsed = await getHomes.json()
        console.log(responseParsed.data)
        this.setState({
          homes: responseParsed.data
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  getEvents = async () => {
    try {
      const getEvents = await fetch(`http://localhost:8000/event/`, {
        method: 'GET',
        credentials: 'include',// on every request we have to send the cookie
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if(getEvents.ok) {
        const responseParsed = await getEvents.json()
        console.log(responseParsed.data)
        this.setState({
          events: responseParsed.data
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  getResources = async () => {
    try {
      const getResources = await fetch(`http://localhost:8000/resource/`, {
        method: 'GET',
        credentials: 'include',// on every request we have to send the cookie
        headers: {
          'Content-Type': 'application/json'
      }
      })
      if(getResources.ok) {
        const responseParsed = await getResources.json()
        console.log(responseParsed.data)
        this.setState({
          resources: responseParsed.data
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  render () {
    console.log(this.state)
    console.log('this is state')
  return (
    <Section>
      <Container>
      <DivImgBox>
        <Img src="https://i.imgur.com/UZldlfV.jpg"/>
        <Div>
          <DivContent>
            <H2>West Covina, Ca</H2>
            <Button>More Info</Button>
          </DivContent>
        </Div>
      </DivImgBox>
      <DivImgBox>
        <Img src="https://i.imgur.com/Eq61Y1j.jpg"/>
        <Div>
          <DivContent>
            <H2>Los, Angeles</H2>
            <Button>More Info</Button>
          </DivContent>
        </Div>
      </DivImgBox>
      </Container>
    </Section>
    )
  }
}

export default Home