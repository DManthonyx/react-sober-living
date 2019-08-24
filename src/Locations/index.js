import React, { Component } from 'react';

class Locations extends Component {

  state = {
    locations: []
  }

  async componentDidMount() {
    this.getLocations()
  };

  getLocations = async () => {
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
          locations: responseParsed.data
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  render() {
  return (
    <div>
      events
    </div>
  )
  }
}

export default Locations