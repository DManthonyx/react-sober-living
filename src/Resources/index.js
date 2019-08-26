import React, { Component } from 'react';

class Resource extends Component {

  state = {
    resources: []
  }

  async componentDidMount() {
    this.getResources()
  };

  
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

  render() {
  return (
    <div>
      events
    </div>
  )
  }
}

export default Resource