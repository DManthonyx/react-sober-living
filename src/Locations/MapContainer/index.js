import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react';

import {
  Container
} from './style'

export class MapContainer extends Component {

  state ={
    name: '',
    address: '',
  }

  render() {
      const { homes } = this.props
      const { name, address, phoneNumber} = this.state
    return (
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
                    initialCenter={{
                      lat: this.props.cordinates.lat, 
                      lng: this.props.cordinates.lng
                    }}
                    key={i}
                    position={{lat: home.latitude, lng: home.longitude}}
                    onClick={() => this.props.viewHome(home.id)}
                    />
                )
            })
        }
        </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY
})(MapContainer)
