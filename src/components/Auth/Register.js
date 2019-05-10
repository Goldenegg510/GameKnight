import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { updateUserDetails } from '../../redux/reducer'
import { connect } from 'react-redux'
import axios from 'axios'

class Register extends Component {
  constructor() {
    super()
    this.state = {
      user_id:'',
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
    const user_id = await axios.post('/auth/register', { username, email, password })
    if (user_id.data.user_id) {
      await this.setState({
        username:username,
        email: email,
        authenticated: true,
        user_id: user_id.data.user_id
      })
      console.log(user_id)
      await this.props.updateUserDetails({username:this.state.username, email:this.state.email, authenticated:this.state.authenticated, user_id:this.state.user_id})
      console.log(this.props)
      this.props.history.push('/group-page')
    }
  }

  render() {
    return (
      <form>
        <input onChange={this.handleChange} name='username' placeholder='username' />
        <input onChange={this.handleChange} name='email' placeholder='email' />
        <input onChange={this.handleChange} name='password' placeholder='password' />
        <button onClick={this.handleSubmit} >Register</button>
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

export default connect(mapStateToProps, mapDispatchToProps())(withRouter(Register))