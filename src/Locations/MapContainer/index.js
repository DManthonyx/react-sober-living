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
      console.log(homes)
      const { name, address, phoneNumber} = this.state
    return (
        <Map google={this.props.google} zoom={8}
        style={{width: '45%', height: '400px'}}
        initialCenter={{
          lat: this.props.cordinates.lat, 
          lng: this.props.cordinates.lat
        }}
        >
        {
            (homes || []).map((home, i) => {
                return (
                    <Marker 
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
