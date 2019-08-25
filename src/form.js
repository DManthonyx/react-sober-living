import React, { Component } from 'react'

class App extends Component {
  render() {
    return (
      <div>
        <form onSubmit={this.handlesubmit} noValidate>
          <div className="firstName">
            <label htmlFor="firstName">firstName</label>
            <input type="text" className="" name="firstName" placeholder="FirstName" onChange={this.handleChange} noValidate/>
          </div>

        </form>
      </div>
    )
  }
}

export default App