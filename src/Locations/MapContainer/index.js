import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react';
 
export class MapContainer extends Component {

  render() {
      const {homes} = this.props
      console.log(homes)
    return (
        <Map google={this.props.google} zoom={8}
        style={{width: '40%', height: '400px'}}
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
                    icon={{
                        url: "/images/earthquake.png",
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
