import React, { Component } from 'react';
import MapLocations from './MapLocations'

import {
  Container,
  Section,
  Article,
  Form,
  Input,
  InputDiv,
  Submit,
  H1,
  Small,
  SmallDivs
} from './style'

class Locations extends Component {

  state = {
    homes: []
  }

  async componentDidMount() {
    this.getHomes()
  };

  getHomes = async () => {
    try {
      const getLocations = await fetch(`http://localhost:8000/home/`, {
        method: 'GET',
        credentials: 'include',// on every request we have to send the cookie
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if(getLocations.ok) {
        const responseParsed = await getLocations.json()
        console.log(responseParsed.data)
        this.setState({
          homes: responseParsed.data
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  render() {
  return (
    <Container>
      <H1>Locations</H1>
      <Section>
        <Article>
          <MapLocations  homes={this.state.homes}/>
        </Article>
        <Article>

        </Article>
      </Section>
      <Section>

      </Section>
    </Container>
  )
  }
}

export default Locations