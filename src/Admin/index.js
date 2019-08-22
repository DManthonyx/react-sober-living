import React, { Component } from 'react';

import CreateHomes from '../CreateHomes'

import {
  Section,
  H1
} from './style'

class Admin extends Component {

  createHome = async (data) => {
    try {
      const createHome = await fetch('http://localhost:8000/home', {
        method: 'POST',
        credentials: 'include',// on every request we have to send the cookie
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
  render () {
  return (
    <div>
      <Section>
        <H1>Homes</H1>

        <CreateHomes createHome={this.createHome}/>
      </Section>
      <Section>
        <H1>Business</H1>
        
      </Section>
      <Section>
        <H1>User</H1>
        
      </Section>
      <Section>
        <H1>Events</H1>
        
      </Section>
      <Section>
        <H1>Resources</H1>
        
      </Section>
    </div>
  )
  }
}

export default Admin