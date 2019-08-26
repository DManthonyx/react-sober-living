import React, { Component } from 'react';

import Homes from './Homes'
import Events from './Events'
import Resources from './Resources'

import {
  Section,
  H1,
  Name
} from './style'

class Admin extends Component {

  state = {
    users: []
  }

  async componentDidMount() {
    this.getUsers();
  };

  getUsers = async () => {
    try {
      const getUsers = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/`, {
        method: 'GET',
        credentials: 'include',// on every request we have to send the cookie
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if(getUsers.ok) {
        const responseParsed = await getUsers.json()
        console.log(responseParsed.data)
        this.setState({
          users: responseParsed.data
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  render () {
    const { id } = this.props
    const { users } = this.state
    const business = users.filter(u => u.user_type === 'business')
  return (
    <div>
      <Name>{this.props.name}</Name>
      <Section>
        <H1>Homes</H1>
        <Homes id={id}/>
      </Section>
      <Section>
        <H1>Business</H1>
        {
         business.map((b,i) => {
          return <p key={i}>{b.name}</p>
         })
        }
      </Section>
      <Section>
        <H1>Events</H1>

        <Events id={id}/>
      </Section>
      <Section>
        <H1>Resources</H1>

        <Resources id={id}/>
      </Section>
    </div>
  )
  }
}

export default Admin