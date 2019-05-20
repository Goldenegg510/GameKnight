import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from './Header'
import { updateUserDetails } from '../redux/reducer'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      updateUsername: '',
      updateEmail: '',
      toggleEdit: 'none'
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = async (e) => {
    const { updateUsername, updateEmail } = this.state
    const {user_id, username, email, authenticated} = this.props
    if (e.target.name === 'updateUsername') {
      const updatedUsername = await axios.post(`/auth/updateUsername`, { updateUsername })
      this.props.updateUserDetails({username:updatedUsername[0].username, user_id, email, authenticated})
    }
    if (e.target.name === 'updateEmail') {
      const updatedEmail = await axios.post(`/auth/updateEmail`, { updateEmail })
      this.props.updateUserDetails({username, user_id, email:updatedEmail[0].email, authenticated})
    }
  }

  toggleEditInputs = () => {
    if (this.state.toggleEdit === 'none') {
      this.setState({
        toggleEdit: 'inline'
      })
    } else {
      this.setState({
        toggleEdit: 'none'
      })
    }

  }

  render() {
    return (
      <div>
        <Header />
        <div>{this.props.username}</div>
        <div>{this.props.email}</div>
        <input placeholder='new username' name='updateUsername' style={{ display: this.state.toggleEdit }} />
        <button name='updateUsername' onClick={this.handleSubmit} style={{ display: this.state.toggleEdit }} >Submit</button>
        <input placeholder='new email' name='updateEmail' style={{ display: this.state.toggleEdit }} />
        <button name='updateEmail' onClick={this.handleSubmit} style={{ display: this.state.toggleEdit }} >Submit</button>
        <button onClick={this.toggleEditInputs}>Edit</button>
        <button onClick={this.handleLogout}>LogOut</button>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    ...state
  }
}
function mapDispatchToProps() {
  return { updateUserDetails }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile))