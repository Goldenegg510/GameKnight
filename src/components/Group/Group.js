import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import axios from 'axios'
import {Link} from 'react-router-dom'

class Groups extends Component {
  constructor() {
    super()

    this.state = {
      groups: []
    }
  }
componentDidMount(){
  console.log(this.props.user_id)
  axios.get(`/groups/${this.props.user_id}`).then(res => (
    this.setState({
      groups: res.data
    })
  ))
}
  render() {
    return (
      <div>
        {this.state.groups.map(current => (<Link to='/group' key={current.group_id}>{current.group_name}</Link>))}
      </div>
    )
  }
}

function mapStateToProps (state){
  return {
    ...state 
  }
  }

export default connect(mapStateToProps)(withRouter(Groups))