import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { updateUserDetails } from '../../redux/reducer'
import { connect } from 'react-redux'
import axios from 'axios'

class Register extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      email: '',
      password: '',
      authenticated: false
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const { username, email, password } = this.state
    const worked = await axios.post('/auth/register', { username, email, password })
    if (worked) {
      this.setState({
        username:username,
        email: email,
        authenticated: true
      })
      this.props.history.push('/group-page')
    }
  }

  render() {
    return (
      <form>
        <input onChange={this.handleChange} name='username' placeholder='username' />
        <input onChange={this.handleChange} name='email' placeholder='email' />
        <input onChange={this.handleChange} name='password' placeholder='password' />
        <button onClick={this.handleSubmit} >Submit</button>
      </form>
    )
  }
}
function mapStateToProps (state){
return {
  ...state 
}
}
function mapDispatchToProps() {
 return{ updateUserDetails}
}

export default connect(mapStateToProps, mapDispatchToProps(withRouter(Register)))