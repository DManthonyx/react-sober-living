import React, { Component } from 'react';
import Map from './Map'

import {
  Container,
  Section,
  Article,
  H1,
  Div,
  HomeDiv,
  InfoDiv,
  P,
  CurrentHome
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
      const getLocations = await fetch(`${process.env.REACT_APP_BACKEND_URL}/locations/`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if(getLocations.ok) {
        const responseParsed = await getLocations.json()
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
           <Map  homes={this.state.homes}/> 
        </Article>
        <Article>
        <Div>
            <CurrentHome>

            </CurrentHome>
            <HomeDiv>
                {
                  this.state.homes.map((home,i) => {
                    return (
                      <InfoDiv key={i}>
                        <P>Title:  {home.title}</P>
                        <P>City:  {home.city}</P>
                        <P>Adress:  {home.address}</P>
                      </InfoDiv>
                    )
                  })
                }
            </HomeDiv>
            </Div>
        </Article>
      </Section>
      <Section>

      </Section>
    </Container>
  )
  }
}

export default Locations