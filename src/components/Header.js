import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import { updateUserDetails } from '../redux/reducer'
import { withRouter } from 'react-router-dom'
import logo from '../img/logo.png'

class Header extends Component {
  constructor() {
    super()
    this.state = {
      authenticated: false,
      user_id: null,
      username: '',
      email: ''
    }
  }

  async componentDidMount() {
    const result = await axios.get('/user_data')
    if (result.data) {
      const { authenticated } = result.data
      const { user_id, username, email } = result.data.user
      this.setState({
        authenticated,
        user_id,
        username,
        email
      })
      this.props.updateUserDetails(this.state)
    } else {
      this.props.history.push('/')
    }
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
        <span className='navDiv'>
          <Link className='navButton' to={home}>Home</Link>
          <Link className='profileButton' to='/profile'>
          <div>
            Welcome
          </div> 
          <div>{this.state.username}</div>
          </Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))