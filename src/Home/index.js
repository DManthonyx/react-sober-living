import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class Home extends Component {
  state = {
    homes: [],
    resources: [],
    events: [],

  }

  async componentDidMount () {
    this.getHomes()
  }

  getHomes = async () => {
    try {
      const getHomes = await fetch(`http://localhost:8000/home/`, {
        method: 'GET',
        credentials: 'include',// on every request we have to send the cookie
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if(getHomes.ok) {
        const responseParsed = await getHomes.json()
        console.log(responseParsed.data)
        this.setState({
          homes: responseParsed.data
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

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

  render () {
  return (
    <div>
      
    </div>
    )
  }
}

export default Home