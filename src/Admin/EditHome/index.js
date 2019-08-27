import React from 'react';
import {
  Section,
  Form,
  Input,
  Submit,
  H1,
  Cancel
} from './style'

const EditHome = (props) =>  {
  return (
    <Section>
      <H1>Edit Home</H1>
      <Form onSubmit={props.closeAndEdit}>
        <Input className="edit-input" type="text" name="city" placeholder="city" value={props.homeToEdit.city} onChange={props.onInputEditChange} />
        <Input type="text" name="address" placeholder="address" value={props.homeToEdit.address} onChange={props.onInputEditChange} />
        <Input type="text" name="longitude" placeholder="longitude" value={props.homeToEdit.longitude} onChange={props.onInputEditChange} />
        <Input type="text" name="latitude" placeholder="latitude" value={props.homeToEdit.latitude} onChange={props.onInputEditChange} />
        <Input type="text" name="title" placeholder="title" value={props.homeToEdit.title} onChange={props.onInputEditChange} />
        <Input type="text" name="description" placeholder="description" value={props.homeToEdit.description} onChange={props.onInputEditChange} />
        <Input type="number" name="phone_number" placeholder="phone number" value={props.homeToEdit.phone_number} onChange={props.onInputEditChange} />
        <Input type="email" name="email" placeholder="email" value={props.homeToEdit.email} onChange={props.onInputEditChange} />
        <Input type="text" name="link" placeholder="link to website" value={props.homeToEdit.link} onChange={props.onInputEditChange} />
        <Input type="file" name="image" placeholder="image"  onChange={props.onInputEditChange} />
        <Submit>SUBMIT</Submit>
        <Cancel onClick={props.switchEdit}>Cancel</Cancel>
      </Form>
    </Section>
    )
  }

export default EditHome;