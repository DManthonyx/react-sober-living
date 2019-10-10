import React, { Component } from 'react';
import Map from './MapContainer'

import {
  Container,
  Section,
  Article,
  H1,
  Div,
  BarDiv,
  InfoDiv,
  P,
  CurrentBar
} from './style'

class Locations extends Component {

  render() {
  return (
    <Container>
      <H1>Locations</H1>
      <Section>
        <Article>
           <Map  homes={this.props.homes}/> 
        </Article>
        <Article>
        <Div>
            <BarDiv>
                {
                  this.props.homes.map((home,i) => {
                    return (
                      <InfoDiv key={i}>
                        <P>Title:  {home.title}</P>
                        <P>City:  {home.city}</P>
                        <P>Adress:  {home.address}</P>
                        <P>Phone Number: {home.phone_number}</P>
                      </InfoDiv>
                    )
                  })
                }
            </BarDiv>
            </Div>
        </Article>
      </Section>
    </Container>
  )
  }
}

export default Locations