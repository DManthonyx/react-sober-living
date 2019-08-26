import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react';
import {
  Section,
  Form,
  Input,
  InputDiv,
  Submit,
  H1,
  Small,
  SmallDiv
} from './style'

 
export class MapContainer extends Component {

  render() {
    console.log(process.env.REACT_APP_API_KEY)
    return (
        <Map google={this.props.google} zoom={2}
        style={{width: '40%', height: '70%'}}>
        
        {
            this.props.homes.map((home, i) => {
                return (
                    <Marker 
                    position={{lat: home.latitude, lng: home.longitude}}
                    icon={{
                        anchor: new this.props.google.maps.Point(0,0),
                        scaledSize: new this.props.google.maps.Size(25,25)
                    }}
                    />
                )
            })
        }
 
        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>location</h1>
            </div>
        </InfoWindow>
        </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY
})(MapContainer)