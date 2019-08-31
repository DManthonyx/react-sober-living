import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react';

import {
  DivInfo,
  H1,
  P,
  Container
} from './style'

export class MapContainer extends Component {
  state ={
    name: '',
    address: '',
  }

  changeCurrentLoaction = (home) => {
    this.setState({
      name: home.title,
      address: home.address,
      phoneNumber: home.phone_number
    })
    console.log(home)
  }

  render() {
      const {homes} = this.props
      console.log(homes)
      const { name, address, phoneNumber} = this.state
    return (
        <Container>
        <Map google={this.props.google} zoom={8}
        style={{width: '45%', height: '400px'}}
        initialCenter={{
          lat: 34.0522, 
          lng: -118.2437
        }}
        >
        {
            (homes|| []).map((home, i) => {
                return (
                    <Marker 
                    key={i}
                    position={{lat: home.latitude, lng: home.longitude}}
                    onClick={() => this.changeCurrentLoaction(home)}
                    />
                )
            })
        }
        <InfoWindow 
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}>
        </InfoWindow>
        </Map>
        <DivInfo>
          <H1>Name:  {this.state.name}</H1>
          <P>Address: {this.state.address}</P>
          <P>Phone Number: {this.state.phoneNumber}</P>
        </DivInfo>
        </Container>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY
})(MapContainer)
