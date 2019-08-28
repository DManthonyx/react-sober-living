import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import EditHome from '../Admin/EditHome'

import {
  Section,
  H1, 
  Form,
  Input,
  Submit,
  Small,
  Div,
  Button,
  Image,
  DetailDiv,
  P,
  DivCreate,
  BtnCreateHome,
  HomeDiv,
  InputDiv,
  SectionHome,
  SectionChange,
} from './style'



class UserBusiness extends Component {
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
    error: {
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
    },
    showEditModal: false,
    homeToEdit: {},
    isOpen: false,
  } 

  async componentDidMount () {
    this.getHomes()
  }

  getHomes = async () => {
    try {
      const getHomes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/locations/${this.props.id}/user`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if(getHomes.ok) {
        const responseParsed = await getHomes.json()
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
      const createHome = await fetch(`${process.env.REACT_APP_BACKEND_URL}/locations/${this.props.id}/createhome`, {
        method: 'POST',
        credentials: 'include',
        body: data,
        headers: {
          'enctype': 'multipart/form-data'
        }
      })
      const response = await createHome.json();
      this.setState({
        homes: [...this.state.homes, response.data],
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
      })
      return response;
    } catch (err) {
      console.log(err)
    }
  }

  validate = () => {
    let cityError = '';
    if(this.state.city.length < 3) {
      cityError = 'city error'
    }
    if(cityError) {
      this.setState({
        error: {
          city: cityError
        }
      })
      return false
    }

    return true
  };

  submit = async (e) => {
    e.preventDefault();
    const isValid = this.validate();
    if(isValid) {
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
  
  
      const registerCall = this.createHome(data);
      this.setState({
        isOpen: !this.state.isOpen
      })
  
      registerCall.then((data) => {
          if(data.status.message === "Success") {
            console.log('added house')
          } else {
            console.log(data, ' this should have an error message? How could you display that on the screen')
          }
      })
    }
    
  }

  deleteHome = async (id) => {
    try {
      const deleteHome = await fetch(`${process.env.REACT_APP_BACKEND_URL}/locations/${id}/delete`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if(deleteHome.status !== 200){
        throw Error('Something happend on delete')
      }
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
    if(this.state.homeToEdit === {}) {
      this.setState({
        homeToEdit: home,
        showEditModal: true
      }) 

    } else if (home.id === this.state.homeToEdit.id) {
      this.setState({
        homeToEdit: home,
        showEditModal: !this.state.showEditModal
      })
    } else {
      this.setState({
        homeToEdit: home,
        showEditModal: true
      })
    }
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
      const editRequest = await fetch(`${process.env.REACT_APP_BACKEND_URL}/locations/${this.state.homeToEdit.id}/edit`, {
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
        if(home.id === editResponse.data.id){
          home = editResponse.data
        }
        return home
      });
  
      this.setState({
        homes: editedHomeArray,
        showEditModal: false,
      })
    } catch(err){
      console.log(err, ' error closeAndEdit');
      return err
    }
  }

  switchEdit = () => {
    this.setState({
    showEditModal: false
    })
  }

  render () {
  const { city, address, longitude, latitude, title, description, phone_number, email, link, homes} = this.state
  return (
    <Div>
      {
        this.state.isOpen
        ?
        null
        :
        <BtnCreateHome onClick={this.switch}>Add Home</BtnCreateHome>
      }
      <SectionHome>
        {
          homes.map((h, i) => {
            return (
              <HomeDiv key={i}>
                <DetailDiv>
                  <P>Title:  {h.title}</P>
                  <P>City:  {h.city}</P>
                  <P>Adress:  {h.address}</P>
                </DetailDiv>
                <Button onClick={() => this.deleteHome(h.id)}>Delete</Button>
                <Button onClick={() => this.showModal(h)}>Edit</Button>
              </HomeDiv>
            )
          })
        }
      </SectionHome>
      <SectionChange>
      <DivCreate>
      <H1>Create Home</H1>
      <Form onSubmit={this.submit}>
        <InputDiv>
          <Input className="edit-input" type="text" name="city" placeholder="city" value={city} onChange={this.onInputChange} />
          <Input type="text" name="address" placeholder="address" value={address} onChange={this.onInputChange} />
        </InputDiv>
        <InputDiv>
          <Input type="number" name="longitude" placeholder="longitude" value={longitude} onChange={this.onInputChange} />
          <Input type="number" name="latitude" placeholder="latitude" value={latitude} onChange={this.onInputChange} />
        </InputDiv>
        <InputDiv>
          <Input type="text" name="title" placeholder="title" value={title} onChange={this.onInputChange} />
          <Input type="text" name="description" placeholder="description" value={description} onChange={this.onInputChange} />
        </InputDiv>
        <InputDiv>
          <Input type="number" name="phone_number" placeholder="phone number" value={phone_number} onChange={this.onInputChange} />
          <Input type="email" name="email" placeholder="email" value={email} onChange={this.onInputChange} />
        </InputDiv>
        <InputDiv>
          <Input type="text" name="link" placeholder="link to website" value={link} onChange={this.onInputChange} />
        <Input type="file" name="image" placeholder="image"  onChange={this.onInputChange} />
        </InputDiv>
        <InputDiv>
          <Submit>SUBMIT</Submit>
        </InputDiv>
      </Form>
      </DivCreate>
        {
        this.state.showEditModal 
        ?
        <EditHome switchEdit={this.switchEdit} closeAndEdit={this.closeAndEdit} homeToEdit={this.state.homeToEdit} onInputEditChange={this.onInputEditChange}/> 
        :
        null
        }
      </SectionChange>
    </Div>
  )
  }
}

export default withRouter(UserBusiness)