import React, { Component } from 'react'
import axios from 'axios';


export default class AddEventForm extends Component {
  constructor() {
    super()
    this.state = {
      event_date: '',
      time: '',
      place: '',
      addEventToggle: false
    }
  }

  toggle = () => {
    this.setState({
      addEventToggle: !this.state.addEventToggle
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const {event_date, time, place} = this.state

    const new_event_id = await axios.post('/add_event', {event_date, time, place, group_id:this.props.group_id})
    this.setState({
      event_date: '',
      location: '',
      addEventToggle: false,
      time: ''
    })
    this.props.getNewEvent(new_event_id.data[0].event_id)
  }

  render() {
    if (this.state.addEventToggle) {
      return (
        <form onSubmit={this.handleSubmit}>
          <input name='event_date' onChange={this.handleChange} placeholder='date' />
          <input name='place' onChange={this.handleChange} placeholder='location' />
          <input name='time' onChange={this.handleChange} placeholder='time' />
          <button>Submit</button>
        </form>)
    } else {
      return (
        <button onClick={this.toggle}>Add New Event</button>
      )
    }
  }
}