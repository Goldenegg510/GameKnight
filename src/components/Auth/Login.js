import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { updateUserDetails } from '../../redux/reducer'
import { connect } from 'react-redux'
import axios from 'axios'

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
    console.log(loginUsername, loginPassword)
    const user = await axios.post('/auth/login', {
      loginUsername, loginPassword
    })
    console.log(user)
    const {username, user_id, authenticated, email} = user.data
    console.log(authenticated)
    if(authenticated) {
      this.setState({
        username, user_id, authenticated, email
      })
      console.log(this.state)
      this.props.updateUserDetails({username, user_id, authenticated, email})
      this.props.history.push('/group')
    }
  }

  render() {
    return (
      <form>
        <input onChange={this.handleChange} name='loginUsername' placeholder='username' />
        <input onChange={this.handleChange}
          name='loginPassword'
          placeholder='password' />
        <button onClick={this.handleSubmit}>Login</button>
      </form>
    )
  }
}

function mapStateToProps (state){
  return {
    username: state.username, authenticated: state.authenticated, email: state.email,
    user_id: state.user_id
  }
  }
  function mapDispatchToProps() {
   return{ updateUserDetails}
  }
  
  export default connect(mapStateToProps, mapDispatchToProps())(withRouter(Login))