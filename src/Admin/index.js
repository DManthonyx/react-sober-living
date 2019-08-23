import React, { Component } from 'react';

import CreateHome from './CreateHome'
import CreateEvents from './CreateEvent'
import CreateResources from './CreateResource'

import {
  Section,
  H1
} from './style'

class Admin extends Component {

  state = {
    homes: []
  }
  async componentDidMount() {
    this.getHomes();
  };

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

  createHome = async (data) => {
    try {
      const createHome = await fetch(`http://localhost:8000/home/`, {
        method: 'POST',
        credentials: 'include',
        body: data,
        headers: {
          'enctype': 'multipart/form-data'
        }
      })
      const response = await createHome.json();
      console.log(response)
      return response;
    } catch (err) {
      console.log(err)
    }
  }

  createEvent = async (data) => {
    try {
      const createEvent = await fetch(`http://localhost:8000/event/`, {
        method: 'POST',
        credentials: 'include',
        body: data,
        headers: {
          'enctype': 'multipart/form-data'
        }
      })
      const response = await createEvent.json();
      console.log(response)
      return response;
    } catch (err) {
      console.log(err)
    }
  }
  createResource = async (data) => {
    try {
      const createResource = await fetch(`http://localhost:8000/resource/`, {
        method: 'POST',
        credentials: 'include',
        body: data,
        headers: {
          'enctype': 'multipart/form-data'
        }
      })
      const response = await createResource.json();
      console.log(response)
      return response;
    } catch (err) {
      console.log(err)
    }
  }

  render () {
    console.log(this.state)
    const { homes } = this.state
  return (
    <div>
      <Section>
        <H1>Homes</H1>
        {
          homes.map((h, i) => {
            return <p key={i}>{h.title}</p>
          })
        }
        <CreateHome createHome={this.createHome}/>
      </Section>
      <Section>
        <H1>Business</H1>
        
      </Section>
      <Section>
        <H1>User</H1>
        
      </Section>
      <Section>
        <H1>Events</H1>

        <CreateEvents createEvent={this.createEvent}/>
      </Section>
      <Section>
        <H1>Resources</H1>
        
        <CreateResources createResource={this.createResource}/>
      </Section>
    </div>
  )
  }
}

export default Admin