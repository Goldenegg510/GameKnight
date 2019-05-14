import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import {updateUserDetails} from '../redux/reducer'
class Header extends Component {
  constructor(){
    super()
    this.state = {
      authenticated: false,
      user_id: null,
      username: '',
      email: ''
    }
  }
 componentDidMount(){
axios.get('/user_data').then(res => {
  if(res.data){
  const {authenticated} = res.data
  const {user_id, username, email} = res.data.user
this.setState({
  authenticated,
  user_id,
  username,
  email
})
console.log(this.state)
this.props.updateUserDetails(this.state)}
})
}

  render() {
    let home = '/'
    if (this.props.authenticated) {
      home = '/groups'
    }
    return (
      <nav>
        <span>Game Knight</span>
        <span>
          <Link to={home}>Home</Link>
          {this.props.authenticated
            ?
            <Link to='/profile'>Welcome {this.props.username}</Link>
            :
            <Link to='/login'>Login</Link>
          }
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
export default connect(mapStateToProps, mapDispatchToProps)(Header)
