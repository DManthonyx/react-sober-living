import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import {
  Section,
  H1, 
  Form,
  Input,
  Submit
} from './style'

class Resources extends Component {

  state = {
    resources: [],
    city: '',
    address: '',
    longitude: '',
    latitude: '',
    description: '',
    name: '',
    phone_number: '',
    link: '',
  }

  async componentDidMount() {
    this.getResources();
  };

  onInputChange = (e) => {
    if(e.target.name !== 'image'){
      this.setState({[e.target.name]: e.target.value});
    } else {
    this.setState({image: e.target.files[0]});
    }
  }

  getResources = async () => {
    try {
      const getResources = await fetch(`${process.env.REACT_APP_BACKEND_URL}/resource/`, {
        method: 'GET',
        credentials: 'include',// on every request we have to send the cookie
        headers: {
          'Content-Type': 'application/json'
      }
      })
      if(getResources.ok) {
        const responseParsed = await getResources.json()
        console.log(responseParsed.data)
        this.setState({
          resources: responseParsed.data
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  createResource = async (data) => {
    try {
      const createResource = await fetch(`${process.env.REACT_APP_BACKEND_URL}/resource/`, {
        method: 'POST',
        credentials: 'include',
        body: data,
        headers: {
          'enctype': 'multipart/form-data'
        }
      })
      const response = await createResource.json();
      console.log(response)
      this.setState({
        resources: [...this.state.resources, response.data]
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
    data.append('description', this.state.description);
    data.append('name', this.state.name);
    data.append('link', this.state.link);
    data.append('phone_number', this.state.phone_number);
    data.append('link', this.state.link);

    this.setState({
      city: '',
      address: '',
      longitude: '',
      latitude: '',
      description: '',
      name: '',
      phone_number: '',
      link: '',
    })

    const registerCall = this.createResource(data);

    registerCall.then((data) => {
      console.log(data)
        if(data.status.message === "Success") {
          this.props.history.push(`account/${this.props.id}`)
        } else {
          console.log(data, ' this should have an error message? How could you display that on the screen')
        }
    })
  }

  render () {
    const { resources, city, address, longitude, latitude, name, description, phone_number, link} = this.state
  return (
    <div>
      <Section>
        {
          resources.map((r, i) => {
            return <p key={i}>{r.name}</p>
          })
        }
        <H1>Create Resources</H1>
        <Form onSubmit={this.submit}>
          <Input type="text" name="city" placeholder="city" value={city} onChange={this.onInputChange} />
          <Input type="text" name="address" placeholder="address" value={address} onChange={this.onInputChange} />
          <Input type="text" name="longitude" placeholder="longitude" value={longitude} onChange={this.onInputChange} />
          <Input type="text" name="latitude" placeholder="latitude" value={latitude} onChange={this.onInputChange} />
          <Input type="text" name="name" placeholder="name" value={name} onChange={this.onInputChange} />
          <Input type="text" name="description" placeholder="description" value={description} onChange={this.onInputChange} />
          <Input type="number" name="phone_number" placeholder="phone number" value={phone_number} onChange={this.onInputChange} />
          <Input type="text" name="link" placeholder="link to website" value={link} onChange={this.onInputChange} />
          <Submit>SUBMIT</Submit>
        </Form>
      </Section>
    </div>
  )
  }
}

export default withRouter(Resources)