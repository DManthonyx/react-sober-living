import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import EditHome from '../EditHome'

import {
  Section,
  H1, 
  Form,
  Input,
  Submit
} from './style'

class Homes extends Component {

  state = {
    homes: [],
    city: '',
    address: '',
    longitude: '',
    latitude: '',
    title: '',
    image: '',
    description: '',
    phone_number: '',
    email: '',
    link: '',
    showEditModal: false,
    homeToEdit: {}
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

  onInputChange = (e) => {
    if(e.target.name !== 'image'){
      this.setState({[e.target.name]: e.target.value});
    } else {
      this.setState({image: e.target.files[0]});
    }
  }

  onInputEditChange = (e) => {
    if(e.target.name !== 'image'){
      this.setState({
        homeToEdit: {
          ...this.state.homeToEdit,
          [e.target.name]: e.target.value
        }
      });
    } else {
      this.setState({
        homeToEdit: {
          ...this.state.homeToEdit,
          image: e.target.files[0]
        }
      });
    }
  }

  createHome = async (data) => {
    try {
      const createHome = await fetch(`http://localhost:8000/home/${this.props.id}/createhome`, {
        method: 'POST',
        credentials: 'include',
        body: data,
        headers: {
          'enctype': 'multipart/form-data'
        }
      })
      const response = await createHome.json();
      console.log(response)
      this.setState({
        homes: [...this.state.homes, response.data]
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
    data.append('title', this.state.title);
    data.append('description', this.state.description);
    data.append('link', this.state.link);
    data.append('phone_number', this.state.phone_number);
    data.append('email', this.state.email);
    data.append('file', this.state.image);

    this.setState({
      city: '',
      address: '',
      longitude: '',
      latitude: '',
      title: '',
      image: '',
      description: '',
      phone_number: '',
      email: '',
      link: '',
    })

    const registerCall = this.createHome(data);

    registerCall.then((data) => {
      console.log(data)
        if(data.status.message === "Success") {
          // tell the user they successfully added the house (you can use a message)
        } else {
          console.log(data, ' this should have an error message? How could you display that on the screen')
        }
    })
  }

  deleteHome = async (id) => {
    console.log(id, ' delete home ID')
    try {
      const deleteHome = await fetch(`http://localhost:8000/home/${id}/delete`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if(deleteHome.status !== 200){
        throw Error('Something happend on delete')
      }
      // this object is the actual response from the api
      const deleteHomeJson = await deleteHome.json();
      this.setState({
        homes: this.state.homes.filter((home) => home.id !== id)
      })
    } catch(err){
      console.log(err);
      return err
    }
  }

  showModal = (home) => {
    this.setState({
      homeToEdit: home,
      showEditModal: !this.state.showEditModal
    })
  }

  closeAndEdit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('city', this.state.homeToEdit.city);
    data.append('address', this.state.homeToEdit.address);
    data.append('longitude', this.state.homeToEdit.longitude);
    data.append('latitude', this.state.homeToEdit.latitude);
    data.append('title', this.state.homeToEdit.title);
    data.append('description', this.state.homeToEdit.description);
    data.append('link', this.state.homeToEdit.link);
    data.append('phone_number', this.state.homeToEdit.phone_number);
    data.append('email', this.state.homeToEdit.email);
    data.append('file', this.state.homeToEdit.image);
    try {
      console.log(this.state.homeToEdit)
      const editRequest = await fetch(`http://localhost:8000/home/${this.state.homeToEdit.id}/edit`, {
        method: 'PUT',
        credentials: 'include',
        body: data,
        headers: {
        'enctype': 'multipart/form-data'
      }
      })
      if(editRequest.status !== 200){
        throw Error('editResquest not working')
      }
      const editResponse = await editRequest.json();
      const editedHomeArray = this.state.homes.map((home) => {
        // remember map creates a brand new array
        if(home._id === editResponse.data._id){
        // comparing every movie in the array, the
        // movie we edited
        // and if they match update the movie with response
        // data from the api
          home = editResponse.data
        }
        return home
      });
      this.setState({
        movies: editedHomeArray,
        showEditModal: false
      })
      console.log(editResponse, ' editResponse');
    } catch(err){
      console.log(err, ' error closeAndEdit');
      return err
    }
  }

  render () {
    const { city, address, longitude, latitude, title, description, phone_number, email, link, homes} = this.state
  return (
    <div>
      <Section>
        {
          homes.map((h, i) => {
            return (
              <div key={i}>
                <p>{h.title}</p>
                {console.log(h)}
                <button onClick={() => this.deleteHome(h.id)}>Delete</button>
                <button onClick={() => this.showModal(h)}>Edit</button>
              </div>
            )
          })
        }
        <H1>Create Homes</H1>
        <Form onSubmit={this.submit}>
          <Input type="text" name="city" placeholder="city" value={city} onChange={this.onInputChange} />
          <Input type="text" name="address" placeholder="address" value={address} onChange={this.onInputChange} />
          <Input type="text" name="longitude" placeholder="longitude" value={longitude} onChange={this.onInputChange} />
          <Input type="text" name="latitude" placeholder="latitude" value={latitude} onChange={this.onInputChange} />
          <Input type="text" name="title" placeholder="title" value={title} onChange={this.onInputChange} />
          <Input type="text" name="description" placeholder="description" value={description} onChange={this.onInputChange} />
          <Input type="number" name="phone_number" placeholder="phone number" value={phone_number} onChange={this.onInputChange} />
          <Input type="email" name="email" placeholder="email" value={email} onChange={this.onInputChange} />
          <Input type="text" name="link" placeholder="link to website" value={link} onChange={this.onInputChange} />
          <Input type="file" name="image" placeholder="image" onChange={this.onInputChange} />
          <Submit>SUBMIT</Submit>
        </Form>
        {this.state.showEditModal ? <EditHome closeAndEdit={this.closeAndEdit} homeToEdit={this.state.homeToEdit} onInputEditChange={this.onInputEditChange}/> : null}
      </Section>
    </div>
  )
  }
}

export default withRouter(Homes)