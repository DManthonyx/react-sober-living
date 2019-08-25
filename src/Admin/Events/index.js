import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import {
  Section,
  H1, 
  Form,
  Input,
  Submit
} from './style'

class Events extends Component {

  state = {
    events: [],
    city: '',
    address: '',
    longitude: '',
    latitude: '',
    name: '',
    description: '',
    image: '',
    phone_number: '',
    link: '',
    error: {
      city: '',
      address: '',
      longitude: '',
      latitude: '',
      name: '',
      description: '',
      image: '',
      phone_number: '',
      link: '',
    },
    showEditModal: false,
    homeToEdit: {},
    isOpen: false,
    setIsOpen: false
  }

  async componentDidMount() {
    this.getEvents();
  };

  onInputChange = (e) => {
    if(e.target.name !== 'image'){
      this.setState({[e.target.name]: e.target.value});
    } else {
      this.setState({image: e.target.files[0]});
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
      this.setState({
        events: [...this.state.events, response.data]
      })
      return response;
    } catch (err) {
      console.log(err)
    }
  }

  submit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('city', this.state.city);
    data.append('address', this.state.address);
    data.append('longitude', this.state.longitude);
    data.append('latitude', this.state.latitude);
    data.append('name', this.state.name);
    data.append('description', this.state.description);
    data.append('link', this.state.link);
    data.append('phone_number', this.state.phone_number);
    data.append('file', this.state.image);

    this.setState({
      city: '',
      address: '',
      longitude: '',
      latitude: '',
      name: '',
      description: '',
      image: '',
      phone_number: '',
      link: '',
    })

    const registerCall = this.createEvent(data);
    registerCall.then((data) => {
      console.log(data)
        if(data.status.message === "Success") {
          console.log(this.props)
          this.props.history.push(`/account/${this.props.id}`)
        } else {
          console.log(data, ' this should have an error message? How could you display that on the screen')
        }
    })
  }

  render () {
    const { events, city, address, longitude, latitude, name, description, phone_number, link} = this.state
  return (
    <div>
      <Section>
        {
          events.map((e, i) => {
            return <p key={i}>{e.name}</p>
          })
        }
        <H1>Create Events</H1>
        <Form onSubmit={this.submit}>
          <Input type="text" name="city" placeholder="city" value={city} onChange={this.onInputChange} />
          <Input type="text" name="address" placeholder="address" value={address} onChange={this.onInputChange} />
          <Input type="text" name="longitude" placeholder="longitude" value={longitude} onChange={this.onInputChange} />
          <Input type="text" name="latitude" placeholder="latitude" value={latitude} onChange={this.onInputChange} />
          <Input type="text" name="name" placeholder="title" value={name} onChange={this.onInputChange} />
          <Input type="text" name="description" placeholder="description" value={description} onChange={this.onInputChange} />
          <Input type="number" name="phone_number" placeholder="phone number" value={phone_number} onChange={this.onInputChange} />
          <Input type="text" name="link" placeholder="link to website" value={link} onChange={this.onInputChange} />
          <Input type="file" name="image" placeholder="image" onChange={this.onInputChange} />
          <Submit>SUBMIT</Submit>
        </Form>
      </Section>
    </div>
  )
  }
}

export default withRouter(Events)