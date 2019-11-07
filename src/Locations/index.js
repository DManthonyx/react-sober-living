import React, { Component } from 'react';
import Map from './MapContainer'

import {
  Container,
  Section,
  Article,
  H1,
  Div,
  HomeDiv,
  InfoDiv,
  P,
  Button
} from './style'

class Locations extends Component {
  render() {
  return (
    <Container>
      <H1>Locations</H1>
      <Section>
        <Article>
           <Map  homes={this.props.homes} viewHome={this.props.viewHome} cordinates={this.props.cordinates}/> 
        </Article>
        <Article>
        <Div>
            <HomeDiv>
                {
                  this.props.homes.map((home,i) => {
                    return (
                      <InfoDiv key={i}>
                        <P>Title:  {home.title}</P>
                        <P>City:  {home.city}</P>
                        <P>Address:  {home.address}</P>
                        <P>Phone Number: {home.phone_number}</P>
                        <Button onClick={() => this.props.viewHome(home.id)}>View Home</Button>
                      </InfoDiv>
                    )
                  })
                }
                
            </HomeDiv>
            </Div>
        </Article>
      </Section>
    </Container>
  )
  }
}

export default Locations