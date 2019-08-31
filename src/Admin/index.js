import React, { Component } from 'react';

import Homes from './Homes'

import {
  Section,
  H1,
  Name,
  Div,
  P,
  Button,
  BusinessDiv
} from './style'

class Admin extends Component {

  state = {
    users: [],
  }

  async componentDidMount() {
    this.getUsers();
  };

  getUsers = async () => {
    try {
      const getUsers = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/`, {
        method: 'GET',
        credentials: 'include',
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

  deleteUser = async (id) => {
    try {
      const deleteUser = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/${id}/admindeletebusiness`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if(deleteUser.status !== 200){
        throw Error('Something happend on delete')
      }
      const deleteUserJson = await deleteUser.json();
      this.setState({
        users: this.state.users.filter((user) => user.id !== id)
      })
    } catch(err){
      console.log(err);
      return err
    }
  }

  render () {
    const { id } = this.props
    const { users } = this.state
    const business = users.filter(u => u.user_type === 'business')
  return (
    <div>
      <Name>ADMIN {this.props.name}</Name>
      <Section>
        <H1>Homes</H1>
        <Homes id={id}/>
      </Section>
      <Section>
        <H1>Business</H1>
        <BusinessDiv>
          {
          business.map((b,i) => {
            return (
              <Div key={i}>
                <P key={i}>{b.name}</P>
                <Button onClick={() => this.deleteUser(b.id)}>Delete</Button>
              </Div>
            )
          })
          }
        </BusinessDiv>
      </Section>
    </div>
  )
  }
}
export default Admin