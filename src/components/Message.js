import React, {Component} from 'react'


export default class Message extends Component{
  constructor(){
    super()
    this.state={
      messages:[]
    }
  }

  componentDidMount(){
    // get group messages
  }

  render(){
    return(
      <div>
        Message 
      </div>
    )
  }
}

