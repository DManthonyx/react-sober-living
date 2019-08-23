import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import {
  Section,
  H1, 
  Form,
  Input,
  Submit
} from './style'

class CreateEvent extends Component {

  state = {
    city: '',
    address: '',
    longitude: '',
    latitude: '',
    name: '',
    description: '',
    image: '',
    phone_number: '',
    link: '',
    }

  onInputChange = (e) => {
    if(e.target.name !== 'image'){
      this.setState({[e.target.name]: e.target.value});
    } else {
      this.setState({image: e.target.files[0]});
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

    const registerCall = this.props.createEvent(data);

    registerCall.then((data) => {
      console.log(data)
        if(data.status.message === "Success") {
          this.props.history.push(`account/${data.data.id}`)
        } else {
          console.log(data, ' this should have an error message? How could you display that on the screen')
        }
    })
  }

  render () {
    const { city, address, longitude, latitude, name, description, phone_number, link} = this.state
  return (
    <div>
      <Section>
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

export default withRouter(CreateEvent)