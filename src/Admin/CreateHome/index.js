import React from 'react';
import {
  Section,
  Form,
  Input,
  Submit,
  H1
} from './style'

const CreateHome = (props) =>  {
console.log(props, 'this is props edit' )
  return (
    <Section>
      <H1>Create Home</H1>
      <Form onSubmit={props.submit}>
        <Input className="edit-input" type="text" name="city" placeholder="city" value={props.city} onChange={props.onInputChange} />
        <Input type="text" name="address" placeholder="address" value={props.address} onChange={props.onInputChange} />
        <Input type="text" name="longitude" placeholder="longitude" value={props.longitude} onChange={props.onInputChange} />
        <Input type="text" name="latitude" placeholder="latitude" value={props.latitude} onChange={props.onInputChange} />
        <Input type="text" name="title" placeholder="title" value={props.title} onChange={props.onInputChange} />
        <Input type="text" name="description" placeholder="description" value={props.description} onChange={props.onInputChange} />
        <Input type="number" name="phone_number" placeholder="phone number" value={props.phone_number} onChange={props.onInputChange} />
        <Input type="email" name="email" placeholder="email" value={props.email} onChange={props.onInputChange} />
        <Input type="text" name="link" placeholder="link to website" value={props.link} onChange={props.onInputChange} />
        <Input type="file" name="image" placeholder="image"  onChange={props.onInputChange} />
        <Submit>SUBMIT</Submit>
      </Form>
    </Section>
    )
  }

export default CreateHome;