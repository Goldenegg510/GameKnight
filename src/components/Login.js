import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { updateUserDetails } from '../redux/reducer'
import { connect } from 'react-redux'
import axios from 'axios'
import LoginHeader from './LoginHeader'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      loginUsername: '',
      loginPassword: '',
      username: '',
      email: '',
      user_id: '',
      authenticated: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const { loginUsername, loginPassword } = this.state
    const user = await axios.post('/auth/login', {
      loginUsername, loginPassword
    })
    const { username, user_id, authenticated, email } = user.data
    if (authenticated) {
      this.setState({
        username, user_id, authenticated, email
      })
      this.props.updateUserDetails({ username, user_id, authenticated, email })
      this.props.history.push('/groups')
    }
  }

  render() {
    return (
      <div><LoginHeader/>
      <form onSubmit={this.handleSubmit}>
      <input onChange={this.handleChange} name='loginUsername' placeholder='username' />
      <input onChange={this.handleChange}
      name='loginPassword'
      placeholder='password' />
      <button>Login</button>
      </form></div>
    )
  }
}

function mapStateToProps(state) {
  return {
    username: state.username, authenticated: state.authenticated, email: state.email,
    user_id: state.user_id
  }
}
const mapDispatchToProps = {
  updateUserDetails
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))