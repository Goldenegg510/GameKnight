import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'


const Header = ({username}) => (
  <nav>
    <span>GameKnight</span>
    <Link to='/'>Home</Link>
  </nav>
)
const mapStateToProps = ({username}) => {
  return {username}
}
export default connect(mapStateToProps)(Header)
