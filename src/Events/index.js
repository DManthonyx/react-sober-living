import React, { Component } from 'react';

class Events extends Component {

  state = {
    events: []
  }

  async componentDidMount() {
    this.getEvents()
  };

  getEvents = async () => {
    try {
      const getEvents = await fetch(`http://localhost:8000/event/`, {
        method: 'GET',
        credentials: 'include',// on every request we have to send the cookie
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if(getEvents.ok) {
        const responseParsed = await getEvents.json()
        console.log(responseParsed.data)
        this.setState({
          events: responseParsed.data
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

export default Events