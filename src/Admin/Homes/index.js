import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import EditHome from '../EditHome'



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
  BtnCreateHome
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
    setIsOpen: false
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
      console.log(this.state)
      return response;
    } catch (err) {
      console.log(err)
    }
  }

  validate = () => {
    let cityError = '';
    console.log(this.state.city.length)
    if(this.state.city.length < 10) {
      cityError = 'city error'
    }
    console.log(cityError,'city error')
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
      console.log('is valid')
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
  
      registerCall.then((data) => {
        console.log(data)
          if(data.status.message === "Success") {
            // tell the user they successfully added the house (you can use a message)
          } else {
            console.log(data, ' this should have an error message? How could you display that on the screen')
          }
      })
    }
    
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
    console.log(home, this.state.homeToEdit, 'showmodal')
    console.log({})
    if(this.state.homeToEdit === {}) {
      this.setState({
        homeToEdit: home,
        showEditModal: true
      }) 
      console.log(this.homeToEdit, 'home edit')
     
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
      console.log(this.state.homes, 'homes')
      console.log(editResponse.data, 'edit response')
      console.log()
      const editedHomeArray = this.state.homes.map((home) => {
        // remember map creates a brand new array
        if(home.id === editResponse.data.id){
        // comparing every movie in the array, the
        // movie we edited
        // and if they match update the movie with response
        // data from the api
          home = editResponse.data
        }
        return home
      });
    
      console.log(editedHomeArray, 'edited home array')
      this.setState({
        homes: editedHomeArray,
        showEditModal: false
      })
      console.log(editResponse, ' editResponse');
    } catch(err){
      console.log(err, ' error closeAndEdit');
      return err
    }
  }

  switch = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render () {

  const { city, address, longitude, latitude, title, description, phone_number, email, link, homes} = this.state
  return (
    <Div>
      <Section>
        {
          homes.map((h, i) => {
            return (
              <Div key={i}>
                <Image src="{'http://localhost:8000/profile_pics/' + this.props.userInfo.image}"/>
                <DetailDiv>
                  <P>{h.city}</P>
                  <P>{h.address}</P>
                  <P>{h.title}</P>
                </DetailDiv>
                <Button onClick={() => this.deleteHome(h.id)}>Delete</Button>
                <Button onClick={() => this.showModal(h)}>Edit</Button>
              </Div>
            )
          })
        }
      {
        this.state.isOpen
        ?
        null
        :
        <BtnCreateHome onClick={this.switch}>Add Home</BtnCreateHome>
      }
      <DivCreate className={this.state.isOpen ? "show" : "hide"} >
      <H1>Create Home</H1>
      <Form onSubmit={this.submit}>
        <Input className="edit-input" type="text" name="city" placeholder="city" value={city} onChange={this.onInputChange} />
        <Small>{this.state.error.city}</Small>
        <Input type="text" name="address" placeholder="address" value={address} onChange={this.onInputChange} />
        <Input type="text" name="longitude" placeholder="longitude" value={longitude} onChange={this.onInputChange} />
        <Input type="text" name="latitude" placeholder="latitude" value={latitude} onChange={this.onInputChange} />
        <Input type="text" name="title" placeholder="title" value={title} onChange={this.onInputChange} />
        <Input type="text" name="description" placeholder="description" value={description} onChange={this.onInputChange} />
        <Input type="number" name="phone_number" placeholder="phone number" value={phone_number} onChange={this.onInputChange} />
        <Input type="email" name="email" placeholder="email" value={email} onChange={this.onInputChange} />
        <Input type="text" name="link" placeholder="link to website" value={link} onChange={this.onInputChange} />
        <Input type="file" name="image" placeholder="image"  onChange={this.onInputChange} />
        <Submit>SUBMIT</Submit>
      </Form>
      </DivCreate>
        {
        this.state.showEditModal 
        ? 
        <EditHome closeAndEdit={this.closeAndEdit} homeToEdit={this.state.homeToEdit} onInputEditChange={this.onInputEditChange}/> 
        :
        null
        }
      </Section>
    </Div>
  )
  }
}

export default withRouter(Homes)