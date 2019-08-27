import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react';
import {
  Section,
  H1,
  Div,
  HomeDiv,
  InfoDiv,
  P,
  CurrentHome
} from './style'

 
export class MapContainer extends Component {

  render() {
    console.log(this.props.homes)
    return (
        <Section>
        <Map google={this.props.google} zoom={5}
        style={{width: '40%', height: '70%'}}>
        
        {
            this.props.homes.map((home, i) => {
                return (
                    <Marker key={i}
                    position={{lat: home.latitude, lng: home.longitude}}
                    icon={{
                        url: 'this is url',
                        anchor: new this.props.google.maps.Point(0,0),
                        scaledSize: new this.props.google.maps.Size(25,25)
                    }}
                    />
                )
            })
        }
 
        <InfoWindow onClose={this.onInfoWindowClose}>
        </InfoWindow>
        </Map>
      </Section>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY
})(MapContainer)