import React, { Component } from 'react';

import {
  Section,
  H1, 
  Form,
  Input,
  Submit
} from './style'

class CreateHomes extends Component {

  state = {
    city: '',
    address: '',
    longitude: '',
    latitude: '',
    title: '',
    image: {},
    description: '',
    phone_numer: '',
    email: '',
    link: '',
    }

  onInputChange = (e) => { this.setState({ [e.target.name]: e.target.value }) 
  };

  submit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('city', this.state.city);
    data.append('address', this.state.address);
    data.append('longitude', this.state.longitude);
    data.append('latitude', this.state.latitude);
    data.append('title', this.state.title);
    data.append('description', this.state.description);
    data.append('link', this.state.link);
    data.append('phone_number', this.state.phone_number);
    data.append('email', this.state.email);
    data.append('image', this.state.ethnicity);
    const registerCall = this.props.createHome(data);

    registerCall.then((data) => {
      console.log(data, 'this is data')
        if(data.status.message === "Success"){
          this.props.history.push('/account')
        } else {
          console.log(data, ' this should have an error message? How could you display that on the screen')
        }
    })
    console.log(this.state)
  }

  render () {
    const { city, address, longitude, latitude, title, image, description, phone_numer, email, link } = this.state
  return (
    <div>
      <Section>
        <H1>Create Homes</H1>
        <Form onSubmit={this.submit}>
          <Input type="text" name="city" placeholder="city" value={city} onChange={this.onInputChange} />
          <Input type="text" name="address" placeholder="address" value={address} onChange={this.onInputChange} />
          <Input type="text" name="longitude" placeholder="longitude" value={longitude} onChange={this.onInputChange} />
          <Input type="text" name="latitude" placeholder="latitude" value={latitude} onChange={this.onInputChange} />
          <Input type="text" name="title" placeholder="title" value={title} onChange={this.onInputChange} />
          <Input type="text" name="description" placeholder="description" value={description} onChange={this.onInputChange} />
          <Input type="text" name="phone_number" placeholder="phone number" value={phone_numer} onChange={this.onInputChange} />
          <Input type="email" name="email" placeholder="email" value={email} onChange={this.onInputChange} />
          <Input type="text" name="link" placeholder="link to website" value={link} onChange={this.onInputChange} />
          <Input type="file" name="image" placeholder="image" value={image} onChange={this.onInputChange} />
          <Submit>SUBMIT</Submit>
        </Form>
      </Section>
    </div>
  )
  }
}

export default CreateHomes