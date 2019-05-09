import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

 const Header = ({username, authenticated}) => {
    return(
  <nav>
    <span>Game Knight</span>
    <span>
      <Link to='/'>Home</Link>
      {authenticated 
      ?
      <Link to='/profile'>Welcome {username}</Link>
      :
      <Link to='/login'>Login</Link>
      }
    </span>
  </nav>
  )
}



const mapStateToProps = (reduxState) => {
  const {username, authenticated} = reduxState
  return {username, authenticated}
}
export default connect(mapStateToProps)(Header)
