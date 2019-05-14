import React, { Component } from 'react'
import axios from 'axios'
// import { connect } from 'react-redux'
import AddEventForm from './AddEventForm'



export default class Event extends Component {
  constructor() {
    super()
    this.state = {
      events: []
    }
  }

  componentDidMount() {
    axios.get(`/group/events/${this.props.group_id}`).then(res => {
      this.setState({
        events: res.data
      })
      console.log(res.data)
    })
  }
  getNewEvent = () => {
    this.setState({
      newobj: {}
    })
  }

  render() {
    return (<div>
        {this.state.events.map((current) => (<div key={current.event_id}>
          <div>{current.event_date}</div>
          <div>{current.time}</div>
          <div>{current.place}</div>
          </div>
        ))}
      <AddEventForm getNewEvent={this.getNewEvent} group_id={this.props.group_id}/>
    </div>)
  }
}
