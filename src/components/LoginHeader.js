import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import { updateUserDetails } from '../redux/reducer'
import logo from '../img/logo.png'
class LoginHeader extends Component {
  constructor() {
    super()
    this.state = {
      authenticated: false,
      user_id: null,
      username: '',
      email: ''
    }
  }

  componentDidMount() {
    axios.get('/user_data').then(res => {
      if (res.data) {
        const { authenticated } = res.data
        const { user_id, username, email } = res.data.user
        this.setState({
          authenticated,
          user_id,
          username,
          email
        })
        this.props.updateUserDetails(this.state)
      }
    })
  }

  render() {
    let home = '/'
    if (this.props.authenticated) {
      home = '/groups'
    }
    return (
      <nav className='header'>
        <div className='logo-container'>
          <img className='logo' src={logo} alt='logo' />
          <div>Game Knight</div>
        </div>
        <span>
          <Link className='navButton' to={home}>Home</Link>
          <Link className='navButton' to='/login'>Login</Link>
        </span>
      </nav>
    )
  }
}

const mapDispatchToProps = {
  updateUserDetails
}

const mapStateToProps = (reduxState) => {
  const { username, authenticated } = reduxState
  return { username, authenticated }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginHeader)